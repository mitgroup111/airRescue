Page({
  data: {
    phone: '',
    password: ''
  },

  // 获取输入账号  
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

  // 登录  
  login: function () {
    if (this.data.phone.length == 0) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'loading',
        duration: 2000
      })
    }else if (this.data.password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面  
      var value = wx.getStorageSync('sessionId');
      wx.request({
        url: 'https://www.hems999.com/weixinSmall!weixinLogin', //仅为示例，并非真实的接口地址
        data: {
          "sessionId": value,
        "userName": this.data.phone,
         "password": this.data.password},
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var query_clone = res.data[0];
          console.log(query_clone);
          if (query_clone.flg == '0') {
              wx.showToast({
                title: query_clone.message,
                icon: 'loading',
                duration: 2000
              })
            } else{
              //登陆成功跳转
              wx.showToast({
                title: query_clone.message,
                icon: 'loading',
                duration: 2000
              })
            }
        }
      });
    }
  }
})  