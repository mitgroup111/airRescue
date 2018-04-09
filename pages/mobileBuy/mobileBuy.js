var appInstance = getApp();
var productId = '';
Page({
  data: {
    phone: '',
    xieyibox: '',
    flag: true,
    xieyi: [
      { name: '我已阅读并同意《九九九空中救护会员服务协议》', value: '0', checked: true }
    ],
    disabled: false
  },

  // 获取输入手机号  
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '我要购买'
    }),
      this.setData({ disabled: false })
  },
  //弹出服务协议
  checkboxChange: function (e) {
    var xieyi = this.data.xieyi;
    console.log(xieyi);
    var checkArr = e.detail.value;
    for (var i = 0; i < xieyi.length; i++) {
      if (checkArr.indexOf(xieyi[i].name) != -1) {
        xieyi[i].checked = true;
      } else {
        xieyi[i].checked = false;
      }
    }
    this.setData({ flag: !xieyi[0].checked })
  },
  //关闭服务协议
  hide: function () {
    this.setData({ flag: true })
  },
  onLoad: function (options) {
    productId = options.productId;
    this.WxValidate = appInstance.wxValidate(
      {
        mobile: {
          required: true,
          tel: true
        },
        xieyibox: {
          required: true
        }
      },
      {
        mobile: {
          required: '请输入手机号',
          tel: '请输入正确的手机号'
        },
        xieyibox: {
          required: '请确认您已阅读并同意《九九九空中救护会员服务协议》'
        }
      }
    )
  },
  // 登录  
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
      console.log("sessionId:" + value);
      console.log("userName:" + e.detail.value.mobile);
      wx.request({
        url: 'https://www.hems999.com/weixinSmall!makeOrder', //仅为示例，并非真实的接口地址
        data: {
          "sessionId": value,
          "userName": e.detail.value.mobile,
          "productId": productId
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var query_clone = res.data[0];
          console.log(query_clone);
          if (query_clone.flg == '0') {
            this.setData({ disabled: true })
            wx.showModal({
              content: query_clone.message,
              duration: 2000
            })
          } else if (query_clone.flg == '1') {
            var order = query_clone.order;
            wx.redirectTo({
              url: '../mobileBuy/mobileOrder?orderId=' + order.orderId + '&orderMoney=' + order.orderMoney
            })
          }
        }
      });
    }
  }
})  