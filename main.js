import Vue from 'vue'
import store from './store'
import App from './App'
/* im 依赖 */
import TIM from 'tim-wx-sdk'
import { isJSON } from './utils/im'
import COS from './utils/im/cos-wx-sdk-v5'
import { SDKAPPID } from './utils/im/GenerateTestUserSig'
import TYPES from './utils/im/types'

/** 创建im实例 */
const tim = TIM.create({
	SDKAppID: SDKAPPID
})
tim.setLogLevel(0)
uni.$app = tim
uni.$app.registerPlugin({ 'cos-wx-sdk': COS })
uni.TIM = TIM
uni.store = store

let $bus = new Vue()
Vue.prototype.TIM = TIM
Vue.prototype.$type = TYPES
Vue.prototype.$store = store
Vue.prototype.$bus = $bus

tim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate, this)
tim.on(TIM.EVENT.SDK_NOT_READY, onReadyStateUpdate, this)

tim.on(TIM.EVENT.KICKED_OUT, kickOut, this)
// 出错统一处理
tim.on(TIM.EVENT.ERROR, onError, this)

tim.on(TIM.EVENT.MESSAGE_RECEIVED, messageReceived, this)//收到消息
tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, convListUpdate, this)
tim.on(TIM.EVENT.GROUP_LIST_UPDATED, groupListUpdate, this)
tim.on(TIM.EVENT.BLACKLIST_UPDATED, blackListUpdate, this)
// tim.on(TIM.EVENT.NET_STATE_CHANGE, netStateChange, this)// 网络变化 提示 需要注释掉
// tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, onMessageReadByPeer)//将对方已读更新 注释

function onReadyStateUpdate({ name }) {
	const isSDKReady = (name === TIM.EVENT.SDK_READY)
	if (isSDKReady) {
		uni.$app.getMyProfile().then(res => {
			store.commit('updateMyInfo', res.data)
		})
		uni.$app.getBlacklist().then(res => {
			store.commit('setBlacklist', res.data)
		})
	}
	store.commit('setSdkReady', isSDKReady)
}
/** 被踢下线 */
function kickOut(event) {
	store.dispatch('resetStore')
	uni.showToast({
		title: '你已被踢下线',
		icon: 'none',
		duration: 1500
	})
	// todo 这里提示用户是否在该设备进行重新登录
	// setTimeout(() => {
	// 	wx.reLaunch({
	// 		url: '../login/main'
	// 	})
	// }, 500)
}

function onError(event) {
	// 网络错误不弹toast && sdk未初始化完全报错
	if (event.data.message && event.data.code && event.data.code !== 2800 && event.data.code !== 2999) {
		store.commit('showToast', {
			title: event.data.message,
			duration: 2000
		})
	}
}

function checkoutNetState(state) {
	switch (state) {
		case TIM.TYPES.NET_STATE_CONNECTED:
			return { title: '已接入网络', duration: 2000 }
		case TIM.TYPES.NET_STATE_CONNECTING:
			return { title: '当前网络不稳定', duration: 2000 }
		case TIM.TYPES.NET_STATE_DISCONNECTED:
			return { title: '当前网络不可用', duration: 2000 }
		default:
			return ''
	}
}

function netStateChange(event) {
	console.log(event.data.state)
	store.commit('showToast', checkoutNetState(event.data.state))
}

/** 已读回执 */
function onMessageReadByPeer(event) {
	console.log(event)
}

function messageReceived(event) {
	for (let i = 0; i < event.data.length; i++) {
		let item = event.data[i]
		if (item.type === TYPES.MSG_GRP_TIP) {
			if (item.payload.operationType) {
				$bus.$emit('groupNameUpdate', item.payload)
			}
		}
		if (item.type === TYPES.MSG_CUSTOM) {
			if (isJSON(item.payload.data)) {
				const videoCustom = JSON.parse(item.payload.data)
				if (videoCustom.version === 3) {
					switch (videoCustom.action) {
						// 对方呼叫我
						case 0:
							if (!store.getters.isCalling) {
								console.log("去视屏通话页面 // todo 未写页面");
								// let url = `../call/main?args=${item.payload.data}&&from=${item.from}&&to=${item.to}`
								// wx.navigateTo({ url })
							} else {
								$bus.$emit('isCalling', item)
							}
							break
						// 对方取消
						case 1:
							console.log("从视屏通话页面出来 // todo 未写页面");
							// wx.navigateBack({
							// 	delta: 1
							// })
							break
						// 对方拒绝
						case 2:
							$bus.$emit('onRefuse')
							break
						// 对方不接1min
						case 3:
							console.log("从视屏通话页面出来 // todo 未写页面");
							// wx.navigateBack({
							// 	delta: 1
							// })
							break
						// 对方接听
						case 4:
							$bus.$emit('onCall', videoCustom)
							break
						// 对方挂断
						case 5:
							$bus.$emit('onClose')
							break
						// 对方正在通话中
						case 6:
							$bus.$emit('onBusy')
							break
						default:
							break
					}
				}
			}
		}
	}
	store.dispatch('onMessageEvent', event)
}

function convListUpdate(event) {
	store.commit('updateAllConversation', event.data)
}

function groupListUpdate(event) {
	store.commit('updateGroupList', event.data)
}

function blackListUpdate(event) {
	store.commit('updateBlacklist', event.data)
}

// 获取系统信息
let sysInfo = uni.getSystemInfoSync()
store.commit('setSystemInfo', sysInfo)

import request from "./utils/request"
import config from "./config"

import uView from 'uview-ui'
Vue.use(uView);

/** 全局变量 */
Vue.prototype.$global = config

/** 数字加解密 */
import number from './utils/encrypt-decrypt-number.js'
Vue.prototype.$number = number

/** 防抖 */
let timer = null
Vue.prototype.$debounce = (fun, wait) => {
	if (timer) {
		clearTimeout(timer)
	}
	timer = setTimeout(() => {
		fun()
		clearTimeout(timer)
	}, wait)
}

/** 全局请求方法 */
Vue.prototype.$http = request

/** 判断登录 */
Vue.prototype.$isLogin = () => {
	let user = uni.getStorageSync("user")
	if (user && user.id) {
		return true
	} else {
		uni.showToast({
			title: '需要登录之后再操作',
			duration: 300,
			icon: 'none',
			complete: () => {
				setTimeout(() => {
					let pages = getCurrentPages();
					let route = pages[pages.length - 1].$page.fullPath;
					console.log(route);
					let param = {
						unit: uni.getStorageSync("unit-id"),
						key: undefined,
						code: undefined,
						redirect: route
					}
					uni.navigateTo({ url: `/pagesE/login/login?query=${JSON.stringify(param)}` });
				}, 300);
			}
		});
		return false
	}
}

/**
 * 日期字符串转new Date(time)
 * @param {String} fmt 转换的格式
 */
String.prototype.newDate = function (fmt) {
	let arr1 = this.split(" ")
	let arr2, arr3, y, M, d, h, m, s
	let hash = fmt ? fmt.includes('h') : false
	let hasm = fmt ? fmt.includes('m') : false
	let hass = fmt ? fmt.includes('s') : false
	if (arr1.length > 1) {
		arr2 = arr1[0].split("-")
		y = arr2[0]
		M = arr2[1]
		d = arr2[2]
		arr3 = arr1[1].split(":")
		h = arr3[0]
		m = arr3[1]
		s = arr3[2]
	} else {
		arr2 = arr1[0].split("-")
		y = arr2[0]
		M = arr2[1]
		d = arr2[2]
	}

	return new Date(y, M - 1, d, hash ? h : '', hasm ? m : '', hass ? s : '')
}

/** 判断是否为空 */
Vue.prototype.$isBlank = (value) => {
	let bool = false
	if (value === null || value === undefined || value === "") {
		bool = true
	} else if (Array.isArray(value) && value.length == 0) {
		bool = true
	}
	return bool
}

Vue.prototype.$navigateTo = (path) => {
	let pages = getCurrentPages();
	let route = pages[pages.length - 1].$page.fullPath;
	if (route !== path) {
		uni.navigateTo({ url: path })
	} else {
		uni.showToast({
			title: "你已在当前页面",
			icon: "none",
			duration: 700
		});
	}
}

/** 日期格式化 */
Date.prototype.format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份   
		"d+": this.getDate(), //日   
		"h+": this.getHours(), //小时   
		"m+": this.getMinutes(), //分   
		"s+": this.getSeconds(), //秒   
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度   
		"S": this.getMilliseconds() //毫秒   
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

// 类似Object.assign方法，但是不会向原对象添加没有的key
Vue.prototype.$assign = (object, data) => Object.keys(object).forEach(key => {
	let old = object[key]
	let xin = data[key]
	if (Array.isArray(old)) { object[key] = xin ? xin.replace(/ /g, '').split(',') : [] }
	else if (typeof xin === 'boolean') { object[key] = xin ? 1 : 0 }
	else if (data.hasOwnProperty(key)) { object[key] = xin }
})

// 阻止产生生产消息
Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue({
	...App
})
app.$mount()