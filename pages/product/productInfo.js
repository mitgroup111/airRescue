// pages/product/productInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("options.productId:" + options.productId);
    wx.request({
      url: 'https://www.hems999.com/weixinSmall!toProductInfo', //仅为示例，并非真实的接口地址
      data: { productId: options.productId},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("获取产品详细信息");
        var query_clone = res.data[0];
        console.log(res.data[0]);
        console.log(query_clone.product);
        that.setData({
          product: query_clone.product,
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
      title: '产品详情'
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