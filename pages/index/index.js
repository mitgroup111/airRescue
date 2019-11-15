var flag = "true";
var a_more;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banner: [
      {
        url: '../../images/banner01.jpg',
        link: '../about/about'
      },
      {
        url: '../../images/banner02.jpg',
        link: '../about/shebei'
      },
      {
        url: '../../images/banner03.jpg',
        link: '../about/yiyuan'
      },
      {
        url: '../../images/banner04.jpg',
        link: '../about/jidi'
      },
      {
        url: '../../images/banner05.jpg',
        link: '../about/liucheng'
      }
    ],
    swiperCurrent: 0,
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  bindViewTap: function (event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.link // 页面跳转地址
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})