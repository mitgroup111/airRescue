var appInstance = getApp();
var currentTime = 60; //倒计时的事件（单位：s） 
var timer = 1;
var mobile,identifyCode;
Page({
  data: {
    time: currentTime,
    getmsg: "获取验证码"
  },
  onLoad: function () {
    this.WxValidate = appInstance.wxValidate(
      {
        mobile: {
          required: true,
          tel: true,
          userUniq:true,
        },
        valiCode:{
          required: true
        },
        password: {
          required: true,
          minlength: 6,
          maxlength: 20,
        },
        repassword: {
          required: true,
          minlength: 6,
          maxlength: 20,
          equalTo: "password"
        }
      }, 
      {
        mobile: {
          required: '请输入手机号',
          tel:'请输入正确的手机号',
          userUniq:"用户的手机号码已经存在",
        },
        valiCode: {
          required: '请输入手机验证码'
        },
        password: {
          required: '请输入密码',
          minlength:'密码至少为6位',
          maxlength: '密码至多为20位',
        },
        repassword: {
          required: '请输入确认密码',
          equalTo:'请输入相同的密码'
        }
      }
    )
  },
  //表单提交
  formSubmit: function (e) {
    const params=e.detail.value;
    console.log("每个值"+params);
    //提交错误描述
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      // `${error.param} : ${error.msg} `
      wx.showModal({
        content: `${error.msg} `,
        duration: 2000
      })
      return false
    }
    this.setData({ submitHidden: false })
    var that = this

    //提交
    wx.request({
      url: '',
      data: {
        Mobile: e.detail.value.mobile,
        valiCode: e.detail.value.valiCode,
        password: e.detail.value.password,
        repassword: e.detail.value.repassword
      },
      method: 'POST',
      success: function (requestRes) {
        that.setData({ submitHidden: true })
        appInstance.userState.status = 0
        wx.navigateBack({
          delta: 1
        })
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },
  onUnload: function () {
    currentTime = 60
  },
  
  //手机验证码
  valiCodeBlurFocus: function (e) {
    identifyCode = e.detail.value;
    var that = this;
    var huozheng = this.data.huozheng
    console.log("验证码"+identifyCode)
    that.setData({
      identifyCode: identifyCode,
      zhengTrue: false,
    })
    if (identifyCode.length >= 6) {
      if (identifyCode == huozheng) {
        that.setData({
          zhengTrue: true,
        })
      } else {
        that.setData({
          zhengTrue: false,
        })
        wx.showModal({
          content: '输入验证码有误',
          showCancel: false,
          success: function (res) {
          }
        })
      }
    }
  },
  //获取手机号
  mobileBlurFocus: function (e) {
    this.setData({
      mobile: e.detail.value
    })
    console.info("手机号" + this.data.mobile);
  },
  reSendPhoneNum: function (e) {
    var getChange = this.data.getChange
    var n = 59;
    var that = this;
    var user = wx.getStorageSync('user');
    var mobile = this.data.mobile;
    if (!(/^1[34578]\d{9}$/.test(mobile))) {
      wx.showModal({
        content: '请输入正确的手机号',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      if (timer == 1) {
        timer = 0
        var that = this
        var time = 60
        that.setData({
          sendmsg: "sendmsgafter",
        })
        var inter = setInterval(function () {
          that.setData({
            getmsg: time + "s后重新发送",
          })
          time--
          if (time < 0) {
            timer = 1
            clearInterval(inter)
            that.setData({
              sendmsg: "sendmsg",
              getmsg: "获取验证码",
            })
          }
        }, 1000)
      }
      wx.request({
        url: 'https://www.hems999.com/reglog!getMobileCode',
        data: {
          mobile: this.data.mobile,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var result = res.data.code;
          console.log(result)
          that.setData({
            huozheng: result,
          })
        }
      })
    }
    
  }
})