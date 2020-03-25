var appInstance = getApp();
var windowW, windowH;
Page({

  data: {
    serial: "",
    beginDate: "",
    jiuXingGpsList: '',
    longitude: "",
    latitude: "",
    controls: [{
      id: 1,
      iconPath: '/images/hujiu.png',
      position: {
        left: 250,
        top: 100,
        width: 60,
        height: 60
      },
      clickable: true
    }, {
      id: 2,
      iconPath: '/images/hujiu.png',
      position: {
        left: 250,
        top: 160,
        width: 60,
        height: 60
      },
      clickable: true
    }]
  },

  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },

  onLoad: function (options) {
    console.log("----onLoad ----");
    var that = this;
    var id = wx.getStorageSync("id");
    console.log("id:" + options.id);
    wx.request({
      url: appInstance.globalData.serverUrl + 'weixinSmall!viewGuiji', //仅为示例，并非真实的接口地址
      data: {
        id: options.id,
        beginDate: "2020-03-23"},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var query_clone = res.data[0];
        if (query_clone.flg == 0) {
          wx.navigateTo({
            url: '../login/login'
          })
        }
        console.log("query_clone:" + query_clone.jiuXingGpsList);
        console.log("lng:" + query_clone.lng);
        that.setData({
          serial: query_clone.serial,
          jiuXingGpsList: query_clone.jiuXingGpsList,
          beginDate: query_clone.beginDate,
          longitude: query_clone.lng,
          latitude: query_clone.lat
        });

        if (query_clone.lng ==""){
          console.log("lng==1");
          wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: (res) => {
              that.setData({
                markers: that.getSchoolMarkers(),
                scale: 15,
                longitude: res.longitude,
                latitude: res.latitude
              })
            }
          });
      } else{
          console.log("lng==2");
          that.setData({
            markers: that.getSchoolMarkers(),
            polyline: [{
              points: that.getP1(),
              color: "#FF0000DD",
              width: 2,
              dottedLine: true
            }],
            scale: 15
          });
      }
      }
    });
  },

  getP1() {
    var pl = [];
    for (let item of this.data.jiuXingGpsList) {
      pl.push({ latitude: item.txlat, longitude: item.txlng })
    }
    return pl;
  },

  getSchoolMarkers() {
    var market = [];
    for (let item of this.data.jiuXingGpsList) {
      let marker1 = this.createMarker(item);
      market.push(marker1)
    }
    return market;
  },

  createMarker(point) {
    let latitude = point.txlat;
    let longitude = point.txlng;
    let marker = {
      iconPath: "/images/hujiu.png",
      id: point.infoId || 0,
      latitude: latitude,
      longitude: longitude,
      label: {
        x: -24,
        y: -26,
        content: ""
      },
      width: 30,
      height: 30
    };
    return marker;
  },
  
  //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;

    if (e.controlId === 1) {
      that.setData({
        scale: --this.data.scale
      })
    } else {
      that.setData({
        scale: ++this.data.scale
      })
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
      title: '轨迹信息'
    })
    

    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("----onHide ----");
    var that = this;
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

  }
})

