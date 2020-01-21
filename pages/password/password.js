var appInstance = getApp();
var phone;
Page({
  data: {
    phone: ''
  },

  // 获取输入手机号  
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  onLoad: function () {
    var sessionId = wx.getStorageSync('sessionId');
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
  // 登录  
  formSubmit: function (e) {
    var formData = e.detail.value;
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
      var userName = e.detail.value.mobile;
      console.log("userName:" + userName);
      wx.request({
        url: appInstance.globalData.serverUrl +'weixinSmall!findPwdMobile', //仅为示例，并非真实的接口地址
        data: {
          "sessionId": value,
          "userName": userName
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
            //修改密码成功
            wx.showModal({
              content: query_clone.message,
              duration: 2000
            })
         
              wx.navigateTo({
                url: '../user/user'
              })
          
          }
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '找回密码'
    }),
      this.setData({ disabled: false })
  }
})  