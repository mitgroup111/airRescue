//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flg:''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var that = this;
    var sessionId = wx.getStorageSync("sessionId");
    console.log("sessionId:" + sessionId);
    wx.request({
      url: 'https://www.hems999.com/weixinSmall!weixinOrderList', //仅为示例，并非真实的接口地址
      data: { sessionId: sessionId },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("获取订单列表");
        var query_clone = res.data[0];
       
        console.log(res.data[0]);
        that.setData({
          flg: query_clone.flg
        });
        if (flg == 0){
          wx.navigateTo({
            url: '../login/login'
          }) 
        }
      }
    });
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
