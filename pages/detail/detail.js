Page({
  data: {
    news: "",
  },
  onReady () {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  onLoad (options) {
    console.log('newsDetail-onLoad')
    var that = this;
    wx.request({
      url: 'https://www.hems999.com/newsDetail_winxin?newIdParam='+options.newsId, //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("从app.js请求服务器test.php获取数据")

        that.setData({
          news: res.data,
        })
        console.log(res.data);
      }
    });
  }
})