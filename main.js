import Vue from 'vue'
import store from './store'
import App from './App'
/* im 依赖 */
import { isJSON } from './utils/im'

uni.store = store

let $bus = new Vue()
Vue.prototype.$bus = $bus

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