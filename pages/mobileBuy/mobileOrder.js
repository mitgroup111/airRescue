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
    console.log("oderId:" + options.orderId );
    console.log("orderMoney:" + options.orderMoney);
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


 doWxPay: function (param) {
   //小程序发起微信支付  
   wx.requestPayment({
     timeStamp: param.data.timeStamp,//记住，这边的timeStamp一定要是字符串类型的，不然会报错，我这边在java后端包装成了字符串类型了  
     nonceStr: param.data.nonceStr,
     package: param.data.package,
     signType: 'MD5',
     paySign: param.data.paySign,
     success: function (event) {
       // success     
       console.log(event);

       wx.showToast({
         title: '支付成功',
         icon: 'success',
         duration: 2000
       });
     },
     fail: function (error) {
       // fail     
       console.log("支付失败")
       console.log(error)
     },
     complete: function () {
       // complete     
       console.log("pay complete")
     }
   });
 } ,
 
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