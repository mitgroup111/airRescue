
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    orderMoney:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      orderId : options.orderId,
      orderMoney : options.orderMoney
    })
   
    // 登录
    wx.login({
      success: res => {
        console.log("code:" + res.code);

        // wx.request({

        //   //获取openid接口
        //   url: 'https://www.hems999.com/weixinSmall!weixinGetOpenId',
        //   data: { code: res.code },
        //   method: 'GET',
        //   success: function (res) {
        //     console.log("openId:" + res.openid);
        //     wx.setStorageSync('openId', res.openid);


        //   }
        // })
      }
    })
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
      title: '产品购买'
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

  },
  

})