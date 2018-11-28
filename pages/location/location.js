var appInstance = getApp();
Page({
  data: {
    phone: '',
    password: ''
  },

  // 获取输入手机号  
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码  
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '九九九直升机呼救'
    })
  },
  onLoad: function () {
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
      var value = wx.getStorageSync('sessionId');
      console.log("value:" + value);
      console.log("userName:" + e.detail.value.mobile);
      console.log("password:" + e.detail.value.password);
      wx.request({
        url: appInstance.globalData.serverUrl +'weixinSmall!weixinLogin', //仅为示例，并非真实的接口地址
        data: {
          "sessionId": value,
          "userName": e.detail.value.mobile
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var query_clone = res.data[0];
          console.log(query_clone);
          if (query_clone.flg == '0') {
            wx.showModal({
              content: query_clone.message,
              duration: 2000
            })
          } else {
            //登陆成功跳转
            wx.showModal({
              content: query_clone.message,
              duration: 2000
            })

            wx.switchTab({
              url: '/pages/user/user'
            })
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