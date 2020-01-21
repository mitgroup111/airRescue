var WxParse = require('../wxParse/wxParse.js');
var appInstance = getApp();
Page({
  data: {
    news: "",
    flag: true
  },
  onLoad (options) {
    console.log('newsDetail-onLoad')
    var that = this;
    wx.request({
      url: appInstance.globalData.serverUrl +'newsDetail_winxin?newIdParam='+options.newsId, //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        WxParse.wxParse('article', 'html', res.data[0].content, that, 5);
        that.setData({
          news: res.data,
          flag: false
        })
        console.log(res.data[0].newsId);
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '新闻速递'
    })
  }
})