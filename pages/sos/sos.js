var appInstance = getApp();
var windowW, windowH;
Page({

  data: {
    latitude: "",
    longitude: "",
    setInter: '',
  },

  onLoad: function () {
    console.log("----onLoad ----");
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("经纬度：" + longitude + " " + latitude)
        that.setData({
          latitude: latitude.toFixed(5),
          longitude: longitude.toFixed(5),
          scale: 12,
          markers: [{
            id: 1,
            latitude: latitude,
            longitude: longitude,
            iconPath: '/images/hujiu.png'
          }],
          setInter: setInterval(function () {
            console.log("---timer----");
            that.getPlaneMarker();
          }, 10000)
        })

        that.mapCtx = wx.createMapContext('myMap');
        that.getPlaneMarker();
        wx.setStorageSync('latitude', latitude.toFixed(5));
        wx.setStorageSync('longitude', longitude.toFixed(5));
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        windowW = res.windowWidth;
        windowH = res.windowHeight;
        that.setData({
          controls: [{
            id: 1,
            iconPath: '/images/location_hujiu.png',
            position: {
              left: (windowW - 280) / 2,
              top: windowH - 200,
              width: 140,
              height: 140
            },
            clickable: true
          }, {
            id: 2,
            iconPath: '/images/location_chuangshang.png',
            position: {
              left: (windowW - 280) / 2 + 140,
              top: windowH - 200,
              width: 140,
              height: 140
            },
            clickable: true
          }]
        })
      },
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
  //创伤反馈
  fankui: function (e) {
    var sosId = wx.getStorageSync("sosId");
    console.log("sosId:" + sosId);
    if (sosId == null || sosId == '') {
      wx.showToast({
        title: "反馈前先呼救",
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../chuangshangfankui/chuangshangfankui'
      });
    }
  },
  //事件的处理方法
  controltap(e) {
    switch (e.controlId) {
      case 1:
        wx.navigateTo({
          url: '../sosInfo/sosInfo'
        });
        break;
      case 2:
        this.fankui();
        break;
      case 3:
        this.scanCode();
        break;
      default: break;
    }
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
    var that = this;
    clearInterval(that.data.setInter)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("----onUnload ----");
    
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
      url: appInstance.globalData.serverUrl + 'weixinSmall!getPlaneMarker', //仅为示例，并非真实的接口地址
      data: { user_tel: emergency_tel },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("获取飞机定位信息");
        var query_clone = res.data[0];

        if (query_clone.flg == 1) {
          wx.getLocation({
            type: 'gcj02',
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
                  iconPath: '/images/hujiu.png',
                }, {
                  id: 2,
                  latitude: query_clone.puinfos.lat,
                  longitude: query_clone.puinfos.lng,
                  iconPath: '/images/plain.gif',
                }]
              })

              wx.showLoading({
                title: '飞机来了',
              })

              setTimeout(function () {
                wx.hideLoading()
              }, 2000)


              that.mapCtx = wx.createMapContext('myMap');
            }
          });

          that.data.setInter;
        } else {

          wx.showLoading({
            title: '飞机等待起飞',
          })

          setTimeout(function () {
            wx.hideLoading()
          }, 2000)

          that.data.setInter;
        }

      }
    });
  }
})

