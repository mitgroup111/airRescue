//app.js
import wxValidate from 'utils/wxValidate.js'
App({
  
  onLaunch: function () {

    wx.request({
      
      //获取openid接口
      url: 'https://www.hems999.com/weixinSmall!getWeiXinSession',
      data: "",
      method: 'GET',
      success: function (res) {
        
        wx.setStorageSync('sessionId', res.data[0].sessionId);
        //getApp().globalData.header.Cookie = 'JSESSIONID=' + res.data.sessionId;
      }
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    websetUrl:"https://www.easy-mock.com/mock/5aa77b542b0894377fc765e4"
  },
  //表单验证
  wxValidate: (rules, messages) => new wxValidate(rules, messages)
})