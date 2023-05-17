// import firstletter from './dict.js'

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  if (isToday(date)) {
    return new Date(date).format('hh:mm')
  }
  return new Date(date).format("yyyy-MM-dd")
}

export function isToday(date) {
  return date.toDateString() === new Date().toDateString()
}

export function throttle(func, wait) {
  let timeout
  return function () {
    let that = this
    let args = arguments

    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null
        func.apply(that, args)
      }, wait)
    }
  }
}
export function formatDuration(time) {
  let interval = time
  let continued = ''
  if (interval > 3600) {
    const hour = Math.floor(interval / 3600)
    continued += hour + '小时'
    interval -= hour * 3600
  }
  if (interval > 60 && interval < 3600) {
    const min = Math.floor(interval / 60)
    continued += min + '分'
    interval -= min * 60
  }
  if (interval < 60) {
    continued += Math.floor(interval) + '秒'
  }
  return continued
}

// 获取中文字符首字母拼音
// export function pinyin (raw) {
//   const str = `${raw}`
//   if (!str || /^ +$/g.test(str)) {
//     return ''
//   }
//   let result = []
//   for (let i = 0; i < str.length; i++) {
//     let unicode = str.charCodeAt(i)
//     let char = str.charAt(i)
//     if (unicode >= 19968 && unicode <= 40869) {
//       char = firstletter.charAt(unicode - 19968)
//     }
//     result.push(char)
//   }
//   return result.join('')
// }
// 判断是否是json string
export function isJSON(str) {
  if (typeof str === 'string') {
    try {
      let obj = JSON.parse(str)
      return !!(typeof obj === 'object' && obj)
    } catch (e) {
      return false
    }
  }
}

export default {
  formatTime,
  throttle,
  formatNumber,
  formatDuration,
  isJSON
}
