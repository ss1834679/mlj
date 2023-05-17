# internet-hospital

互联网医院小程序

- common
	- style.scss (公共样式)
- node_modules
	- tim-wx-sdk (腾讯云imsdk)
	- uview-ui
- pages
	- index (首页)
- pagesA 
	- out (webview页面)
	- webmsg (webview中操作返回的页面)
- pagesB (医生和护士所有页面)
- pagesC (聊天页面)
- pagesD (患者的页面（包括测评中心）)
- pagesE 
	- login (登录页面)
	- pay (支付页面)
	- sys (系统设置)
- static 
    - icon (引入的icon文件)
    - img (静态图片)
- store (vuex 仓库)
- utils (工具)
    - im (im聊天所需要的js文件)
    - check (校验函数)
    - encrypt-decrypt-number (数字加密)
    - qrcode (二维码的js)
    - request (请求封装)