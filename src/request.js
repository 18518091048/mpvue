/* eslint-disable */
// 工具函数库
// const host = 'https://api.rrsjk.com/api'
const host1 = 'http://console.rrsjk.com/api'
const host = "http://120.27.18.243:8081/"
// http get工具函数 获取数据
export function get (url, data) {
  console.log(url,'1111')
  let urls = ''
  if(url.substr(0,7) === '/portal'){
     urls = host1+url
  }else{
     urls = host+url
  }
  return request(urls, 'GET', data)
}
export function post (url, data) {
   let urls = host+url
  return request(urls, 'POST', data)
}

export function postH (url, data, header) {
  return request(url, 'POST', data, header)
}
function request (
  url,
  method,
  data,
  header = {
    'Content-type': 'application/json',
    // 'Cache-Control':'max-age=100000',
    //  'Authorization': 'Bear '+ wx.getStorageSync("userToken")
    // 'cookie': 'DDREADTM='+ wx.getStorageSync("loginTime") +'; DDREADID='+ wx.getStorageSync("loginToken")+';',
    // 'dd-read-tm': wx.getStorageSync("loginTime")
  }) {
  // const ssoLogin = wx.getStorageSync("ssoLogin")
  // if (ssoLogin) {
  //   const loginTime = ssoLogin.loginTime
  //   const loginToken = ssoLogin.loginToken
  //   header['cookie'] = 'DDREADTM='+ loginTime +'; DDREADID='+ loginToken +';'
  //   header['dd-read-tm'] = loginTime
  // }
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      header,
      url: url,
      success: function (res) {
        if(res.data.tokenExpired){ //判断toten 过没过期
          let url = '/pages/login/main'
          wx.redirectTo({url})
        }else{
          resolve(res)
        }
        // resolve(res)
          // if (res.data.status === 200) {
          //   resolve(res)
          // } else {
          //   reject(res.data)
          // }
      }
    })
  })
}
export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

