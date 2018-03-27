//index.js
//获取应用实例
var flg;
const app = getApp()

Page({
  data: {
    haslogin: false,
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
    var that=this;
    console.log("sessionId_transfer:" + sessionId);
    wx.request({
      url: 'https://www.hems999.com/weixinSmall!weixinOrderList', //仅为示例，并非真实的接口地址
      data: { sessionId: sessionId },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var query_clone = res.data[0];
        console.log(query_clone.flg);
        if (sessionId == "") {
          that.setData({ 
            haslogin: true
          })
        } else if (query_clone.flg == 0){
          that.setData({
            haslogin: true
          })
        }else{
          that.setData({
            haslogin: false
          })
        }
        that.setData({
          basicUser: query_clone.basicUser
        })
        
      }
    });
  },

  onUnload: function () {
  }
})
