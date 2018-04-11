var oderId="";
var orderMoney="";
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
    oderId = options.orderId;
    orderMoney = options.orderMoney;
    that.setData({
      orderId : options.orderId,
      orderMoney : options.orderMoney
    })

  },

 toPay:function(){
  var that = this;  
  var value = wx.getStorageSync('openId');
  wx.request({
    url: 'https://teach.hems999.com/weixinSmall!weixinPay2',
    data: { 
      openid: value,
      orderNo: oderId,
      orderMoney: "1"
    },
    method: 'GET',
    success: function (res) {
      console.log(res);
      that.doWxPay(res.data);
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