import config from "../config"
import number from './encrypt-decrypt-number.js'
import Vue from "vue"

const baseUrl = config.baseURL


const request = (url = '', date = {}, type = 'GET') => {
    let header = {}
    console.log(url, date, type, "请求参数");
    /** 获取用户信息 */
    let storeUser = uni.getStorageSync("user")
    /** 获取时间戳信息 */
    let storeTime = uni.getStorageSync("time")

    // 用户 token
    if (!url.startsWith('https://api.psy.com.cn')) { storeUser && (header['Authorization'] = storeUser.token) }
    header['Sign'] = number.encrypt(Date.now() + (storeTime || 0))
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: url.startsWith('https://api.psy.com.cn') ? url : baseUrl + url,
            data: date,
            header: header,
            dataType: 'json',
        }).then((response) => {
            let [error, res] = response;
            const json = res.data
            if (json.time) {
                uni.setStorage({ key: "time", data: json.time - Date.now() });
            }
            if (json.code === -3) {
                uni.hideToast();
                uni.showToast({ title: "请重新登录", icon: "none" });
                setTimeout(() => {
                    uni.clearStorage();
                    uni.redirectTo({ url: `/pages/index/index` });
                }, 500);
                reject(json.message)
            } else if (json.code < 0) {
                uni.hideToast();
                uni.showModal({ title: "系统错误", content: json.message });
                reject(json.message)
            } else { resolve(json) }
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}

export default request