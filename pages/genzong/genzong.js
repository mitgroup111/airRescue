// pages/chuangshangfankui/chuangshangfankui.js
Page({

  data: {
    latitude:"",
    longitude:"",
    setInter: '',
  },

  onLoad: function () {
    console.log("----onLoad ----");
    var that = this;

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude,
          scale: 12,
          markers: [{
            id: 1,
            latitude: latitude,
            longitude: longitude,
            iconPath: '/images/hujiu.gif'
          }],
          setInter: setInterval(function () {
            console.log("---timer----");
            that.getPlaneMarker();
          }, 10000)
        })

        that.mapCtx = wx.createMapContext('myMap');
        that.getPlaneMarker();
       
      }
    })

    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          view: {
            Height: res.windowHeight
          }

        })
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
      title: '直升机实时跟踪'
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("----onHide ----");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("----onUnload ----");
    var that = this;
    clearInterval(that.data.setInter)
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

  //飞机定位
  getPlaneMarker: function () {
    var emergency_tel = wx.getStorageSync("emergency_tel");
    var that = this;
    wx.request({
      url: 'https://teach.hems999.com/weixinSmall!getPlaneMarker', //仅为示例，并非真实的接口地址
      data: { user_tel:'13181502180' },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("获取飞机定位信息");
        var query_clone = res.data[0];

        if (query_clone.flg == 1) {
          wx.getLocation({
            type: 'wgs84',
            success: function (res) {
              var latitude = res.latitude
              var longitude = res.longitude
              that.setData({
                latitude: latitude,
                longitude: longitude,
                scale:12,
                markers: [{
                  id: 1,
                  latitude: latitude,
                  longitude: longitude,
                  iconPath: '/images/hujiu.png',
                }, {
                  id: 2,
                  latitude: query_clone.puinfos.lat,
                  longitude: query_clone.puinfos.lng,
                  iconPath: '/images/plain.gif',
                }]
              })

              wx.showToast({
                title: "飞机来了",
                icon: 'none',
                duration: 2000
              })

              that.mapCtx = wx.createMapContext('myMap');
            }
          });

          that.data.setInter;
        } else {
          wx.showToast({
            title: "飞机等待起飞",
            icon: 'none',
            duration: 2000
          })
          that.data.setInter;
        }

      }
    });
  }
})

