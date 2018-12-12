var appInstance = getApp();
var latitude = wx.getStorageSync('latitude');
var longitude = wx.getStorageSync('longitude');
Page({
  data: {
    phone: '',
    password: '',
    latitude: "",
    longitude: ""
  },

  // 获取输入手机号  
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '九九九直升机呼救'
    })
  },
  onLoad: function () {
    latitude = wx.getStorageSync('latitude');
    longitude = wx.getStorageSync('longitude');
    console.log(latitude);
    var that = this;
    var emergency_tel = wx.getStorageSync("emergency_tel")
    if (emergency_tel != undefined) {
      that.setData({
        emergency_tel: emergency_tel
      })
    }
    that.setData({
      latitude: latitude,
      longitude: longitude
    })
    this.WxValidate = appInstance.wxValidate(
      {
        mobile: {
          required: true,
          tel: true,
        }
      },
      {
        mobile: {
          required: '请输入手机号',
          tel: '请输入正确的手机号'
        }
      }
    )
  },
  // 提交位置  
  formSubmit: function (e) {
    var that = this;
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      // `${error.param} : ${error.msg} `
      wx.showModal({
        content: `${error.msg} `,
        duration: 2000
      })
      return false
    } else {
      // 这里修改成跳转的页面  
      wx.request({
        url: appInstance.globalData.serverUrl + 'weixinSmall!oneKeyNew', //仅为示例，并非真实的接口地址
        data: {
          latitude: latitude,
          longitude: longitude,
          tel: e.detail.value.mobile
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log("一键呼救");
          var timestap = Date.parse(new Date());
          var expiration = timestap + 6*60*60*1000;//6*3600000; 
          wx.setStorageSync('sos_expiration',expiration); 
          var query_clone = res.data[0];
          console.log(query_clone);
          if (query_clone.flg == 1) {
            wx.setStorageSync('emergency_tel', query_clone.tel);
            wx.setStorageSync('sosId', query_clone.sosid);

            that.setData({
              hasTel: true
            })
            //拨打电话
            wx.makePhoneCall({
              phoneNumber: '4008591999' //仅为示例，并非真实的电话号码
            })
            wx.switchTab({
              url: '../sos/sos'
            });
          } else {
            wx.showLoading({
              title: query_clone.msg,
            })

            setTimeout(function () {
              wx.hideLoading()
            }, 2000)


          }
        }
      });
    }
  },
  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {
  }

})  