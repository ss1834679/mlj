/** 是否是本地启动 */
const local = true
export default {
	local,
	root: "*",/* local ? 'http://localhost:81' : */
	cdn: 'https://cdn.psy.com.cn',/* local ? 'http://localhost:90' : */
	baseURL: 'https://h.psy.com.cn/api',/* local ? 'http://localhost:99/api' :  */
	// baseURL: 'https://api.psy.com.cn',
	psyApi: 'https://api.psy.com.cn',
	psyWeb: 'https://www.psy.com.cn',/* local ? 'http://localhost:81' : */
	inWeixin: true/* 是否在微信浏览器 */,
	weixinAppId: "wx51bcc8637ce73434",
	MobileValidateReg: /^1(3[0-9]|4[579]|5[012356789]|6[67]|7[01235678]|8[0-9]|9[1589])\d{8}$/
}