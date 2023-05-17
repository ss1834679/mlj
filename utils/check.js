/** 校验邮箱 */
function checkEmail(email) {
    return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(email);
}
/** 校验手机格式 */
function checkMobile(mobile) {
    return RegExp(/^1[34578]\d{9}$/).test(mobile);
}

/** 校验身份证号 */
function checkIdCard(num) {
    return RegExp(/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/).test(num)
}

module.exports = {
    checkEmail: checkEmail,
    checkMobile: checkMobile,
    checkIdCard: checkIdCard
}