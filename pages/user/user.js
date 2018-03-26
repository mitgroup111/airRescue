//index.js
//获取应用实例
var flg;
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flg:''
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
  },
  /**
  * 生命周期函数--监听页面卸载
  */
  /**
    * 生命周期函数--监听页面显示
    */
  onShow: function () {
    var sessionId = wx.getStorageSync("sessionId");
    console.log("sessionId_transfer:" + sessionId);
    wx.request({
      url: 'https://www.hems999.com/weixinSmall!weixinOrderList', //仅为示例，并非真实的接口地址
      data: { sessionId: sessionId },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var query_clone = res.data[0];
        if (sessionId == "" || query_clone.flg == 0) {
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 5000
          })
          wx.redirectTo({
            url: '../login/login'
          })
        } 
      }
    });
  },

  onUnload: function () {
  }
})
