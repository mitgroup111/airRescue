var appInstance = getApp();
var oderId = "";
var orderMoney = "";
// pages/order/xufei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderRenew: "",
    prodProductInfo: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: appInstance.globalData.serverUrl + 'weixinSmall!toRenew', //仅为示例，并非真实的接口地址
      data: { orderId: options.orderId},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("获取订单续费信息");
        var query_clone = res.data[0];
        oderId = query_clone.orderRenew.orderid;
        orderMoney = query_clone.orderRenew.totalMoney;
        that.setData({
          orderRenew: query_clone.orderRenew,
          prodProductInfo: query_clone.prodProductInfo,
        });
        console.log("oderId:" + oderId);
        console.log("orderMoney:" + orderMoney);
      }
    });
  },

  toPay: function () {
    var that = this;
    var value = wx.getStorageSync('openId');
    console.log("oderId:" + oderId);
    console.log("orderMoney:" + orderMoney);
    wx.request({
      url: appInstance.globalData.serverUrl + 'weixinSmall!weixinPayRenew',
      data: {
        openid: value,
        orderNo: oderId,
        orderMoney: orderMoney
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data[0]);
        that.doWxPay(res.data[0].script);
      }
    });
  },


  doWxPay: function (param) {
    //小程序发起微信支付  
    wx.requestPayment({
      timeStamp: param.timeStamp,//记住，这边的timeStamp一定要是字符串类型的，不然会报错，我这边在java后端包装成了字符串类型了  
      nonceStr: param.nonceStr,
      package: param.package,
      signType: 'MD5',
      paySign: param.paySign,
      success: function (event) {
        // success     
        console.log(event);
        console.log("oderId:" + oderId);
        wx.request({
          url: appInstance.globalData.serverUrl + 'weixinSmall!updateOrderRenew',
          data: {
            orderNo: oderId
          },
          method: 'GET',
          success: function (res) {
            var query_clone = res.data[0];
            if (query_clone.flg == 1) {
              console.log("保存个人信息成功");
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              });
              wx.redirectTo({
                url: '../order/payOkRenew'
              })
            } else {

              wx.showToast({
                title: '续费更新失败,请联系客服',
                icon: 'fail',
                duration: 2000
              })
            }
          }
        });

      },
      fail: function (error) {
        // fail     
        console.log("续费支付失败")
        console.log(error)
      },
      complete: function () {

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
      title: '产品续费'
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