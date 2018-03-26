Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_list:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var sessionId = wx.getStorageSync("sessionId"); 
    console.log("sessionId:" + sessionId);
    wx.request({
      url: 'https://www.hems999.com/weixinSmall!weixinOrderListNew', //仅为示例，并非真实的接口地址
      data: { sessionId: sessionId },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("获取订单列表");
        var query_clone = res.data[0];

        if (query_clone.flg == 0) {
          wx.navigateTo({
            url: '../login/login'
          })
        }
        that.setData({
          flg: res.data[0].flg,
          order_list: query_clone.orderInfoList
        });
      }
    });
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
      title: '我的订单'
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