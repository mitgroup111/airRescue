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
    // console.log("options.orderId:" + options.orderId);
    // orderId=options.orderId;
    // orderMoney = options.orderMoney;
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
  
  unifiedorder: function (req, res) {
    var body = "测试支付"
    var openid = wx.getStorageSync("openId"); 
    var total_fee = 1
    var notify_url = "http://www.hems999.com/weixinNotify"
    var mch_id ="1321397101"
    var attach = "测试"
    wxpay.order(attach, body, mch_id, openid, total_fee, notify_url)
      .then(function (data) {
        console.log('data--->', data, 123123)
        res.json(data)
      })
  }

})