var WxParse = require('../wxParse/wxParse.js');
var appInstance = getApp();
var productId = '';
Page({
  data: {
    phone: '',
    xieyibox: '',
    flag: true,
    xieyi: [
      { name: '我已阅读并同意《九九九空中救护会员服务条款》', value: '0', checked: true }
    ],
    content:'',
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
    var that = this;
    that.setData({ mobile: wx.getStorageSync('mobile') })
    productId = options.productId;
    wx.request({
      url: appInstance.globalData.serverUrl + 'weixinSmall!getXieyi', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("获取协议信息");
        var query_clone = res.data[0];
        console.log("content:" + query_clone.xieyi);
        WxParse.wxParse('content', 'html', query_clone.xieyi, that, 5);
      }
    });


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
          required: '请确认您已阅读并同意《九九九空中救护会员服务条款》'
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
      var openIdValue = wx.getStorageSync('openId');
      console.log("sessionId:" + value);
      console.log("userName:" + e.detail.value.mobile);
      wx.request({
        url: appInstance.globalData.serverUrl +'weixinSmall!makeOrder', //仅为示例，并非真实的接口地址
        data: {
          "sessionId": value,
          "username": e.detail.value.mobile,
          "productId": productId,
          "openId": openIdValue
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
              url: '../mobileBuy/mobileOrder?orderId=' + order.orderid + '&orderMoney=' + order.totalMoney
            })
          }
        }
      });
    }
  }
})  