// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowFrom1: false,
    isShowFrom2: false,
    isShowFrom3: false,
    isShowFrom4: false,
    prodProductInfo: ""
  },
  showFrom(e) {
    var param = e.target.dataset.param;
    this.setData({
      isShowFrom1: param == 1 ? (!this.data.isShowFrom1) : false,
      isShowFrom2: param == 2 ? (!this.data.isShowFrom2) : false,
      isShowFrom3: param == 3 ? (!this.data.isShowFrom3) : false,
      isShowFrom4: param == 4 ? (!this.data.isShowFrom4) : false
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //订单信息，个人信息，健康信息，车辆信息,家人信息
    wx.request({
      url: 'https://www.hems999.com/weixinSmall!viewOrderDetail', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("获取订单详情");
        var query_clone = res.data[0];
        console.log(query_clone.jiaren);
        that.setData({
          prodProductInfo: query_clone.prodProductInfo,
          order: query_clone.order,
          jianKang: query_clone.jianKang,
          vipMember: query_clone.vipMember,
          caru: query_clone.caru,
          jiaren: query_clone.jiaren
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