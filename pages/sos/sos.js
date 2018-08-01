var qqmap = require('../../utils/qqmap-wx-jssdk.min.js');
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

  //一键呼救
  callme: function (e) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 实例化腾讯地图API核心类
    var qqmapsdk = new qqmap({
      key: 'QK5BZ-D7LLO-MKOWG-SKJBE-Q6TD6-4NBTO' // 必填
    });
   
  },

  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg);
    var errStr = e.detail.errMsg;
    //同意获取用户信息进行呼叫
    if (errStr =='getPhoneNumber:ok'){
      //拨打电话
      wx.makePhoneCall({
        phoneNumber: '4008591999' //仅为示例，并非真实的电话号码
      })
      var latitude = "";
      var longitude = "";
      var session_key = wx.getStorageSync("session_key");
      var encryptedData = e.detail.encryptedData;
      var iv = e.detail.iv;
      //1、获取当前位置坐标
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          latitude = res.latitude;
          longitude = res.longitude;
          console.log("latitude:" + latitude);
          console.log("longitude:" + longitude);
          console.log("encryptedData:" + encryptedData);
          console.log("iv:" + iv);

          wx.request({
            url: 'https://teach.hems999.com/weixinSmall!oneKeyNew', //仅为示例，并非真实的接口地址
            data: {
              session_key: session_key,
              encryptedData: encryptedData,
              iv: iv,
              latitude: latitude,
              longitude: longitude
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log("一键呼救");
              var query_clone = res.data[0];
              console.log(query_clone);
              if (query_clone.flg == 1) {
                wx.setStorageSync('emergency_tel', query_clone.tel);
                wx.showToast({
                  title: "一键呼救成功!",
                  icon: 'none',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: query_clone.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          });
        }
      })

     

    
    } else{

      wx.showToast({
        title: '需要授权后实施救援',
        icon: 'none',
        duration: 2000
      })
    }
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