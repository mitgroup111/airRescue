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
        // 登录
        wx.login({
          success: res => {
            console.log("code:" + res.code);

            wx.request({

              //获取openid接口
              url: 'https://www.hems999.com/weixinSmall!weixinGetOpenId',
              data: { code: res.code },
              method: 'GET',
              success: function (res) {
                console.log("openId:" + res.data[0].openid);
                console.log("session_key:" + res.data[0].session_key);
                wx.setStorageSync('openId', res.data[0].openid);
                wx.setStorageSync('session_key', res.data[0].session_key);
              }
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    openId:null,
    serverUrl: "https://www.hems999.com/"
    //serverUrl: "https://teach.hems999.com/"
  },
  //表单验证
  wxValidate: (rules, messages) => new wxValidate(rules, messages)
})