Page({
  /**
   * 页面的初始数据
   */
  data: {
    slider: [
      { picUrl: '../../images/banner01.jpg' },
      { picUrl: '../../images/banner02.jpg' },
      { picUrl: '../../images/banner03.jpg' },
      { picUrl: '../../images/banner04.jpg' },
      { picUrl: '../../images/banner05.jpg' }
    ],
    swiperCurrent: 0,
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //创伤反馈
  fankui: function (e) {
    wx.navigateTo({
      url: '../chuangshangfankui/chuangshangfankui'
    });
  },
  //直升机实时追踪
  zhishengji: function (e) {
    wx.navigateTo({
      url: '../about/about'
    });
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
    wx.setNavigationBarTitle({
      title: '九九九空中救护'
    })
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