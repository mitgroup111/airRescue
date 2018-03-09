var app = getApp()
// var step = 1 // 当前操作的step  
var maxTime = 60
var currentTime = maxTime //倒计时的事件（单位：s）  
var interval = null
var hintMsg = null // 提示  
var timer=1;
var check = require("../../utils/check.js")
var webUtils = require("../../utils/registerWebUtil.js")
var step_g = 1

var phoneNum = null, identifyCode = null, password = null, rePassword = null;

Page({
  data: {
    windowWidth: 0,
    windoeHeight: 0,
    nextButtonWidth: 0,
    step: step_g,
    time: currentTime,
    getmsg: "获取验证码"
  },
  onLoad: function () {
    step_g = 1
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          nextButtonWidth: res.windowWidth - 20
        })
      }
    })
  },
  onUnload: function () {
    currentTime = maxTime
    if (interval != null) {
      clearInterval(interval)
    }
  },
  input_phoneNum: function (e) {
    phoneNum = e.detail.value
  },
  //手机验证码
  input_identifyCode: function (e) {
    identifyCode = e.detail.value;
    var that = this;
    var huozheng = this.data.huozheng
    console.log(e.detail.value)
    that.setData({
      identifyCode: identifyCode,
      zhengTrue: false,
    })
    if (identifyCode.length >= 4) {
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
  input_password: function (e) {
    password = e.detail.value
  },
  input_rePassword: function (e) {
    rePassword = e.detail.value
  },
  reSendPhoneNum: function () {
    var getChange = this.data.getChange
    var n = 59;
    var that = this;
    var user = wx.getStorageSync('user');
    if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
      wx.showModal({
        content: '手机号有误',
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
          tel: phoneNum,
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
    
  },
  register: function () {
    if (!check.checkPhoneNum(phoneNum)) {
      hintMsg = "请输入正确的电话号码!"
    } else if (!check.checkIsNotNull(password)) {
      hintMsg = "请输入密码"
    } else if (!check.checkIsNotNull(password)) {
      hintMsg = "请输入密码"
    } else if (!check.checkIsNotNull(rePassword)) {
      hintMsg = "请输入确认密码"
    } else if (password.length<6) {
      hintMsg = "密码长度最少为6位"
    } else if (!check.isContentEqual(password, rePassword)) {
      hintMsg = "两次密码不一致！"
    } else if (webUtils.submitPassword(password)) {
      hintMsg = "注册成功"
      wx.navigateTo({
        url: '../index/index'
      })
    }
    if (hintMsg != null) {
      /*wx.showToast({
        title: hintMsg,
        icon: 'loading',
        duration: 1000
      })*/
      wx.showModal({
        content: hintMsg,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  },
  yanzhengBtn: function () {
    // console.log(app.globalData.userId);
    var getChange = this.data.getChange
    var n = 59;
    var that = this;
    var phone = this.data.linPhone;
    console.log(phone)
    var user = wx.getStorageSync('user');
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 2000
      })
    } else {
      if (getChange) {
        this.setData({
          getChange: false
        })
        var time = setInterval(function () {
          var str = '(' + n + ')' + '重新获取'
          that.setData({
            getText: str
          })
          if (n <= 0) {
            that.setData({
              getChange: true,
              getText: '重新获取'
            })
            clearInterval(time);
          }
          n--;
        }, 1000);
        wx.request({
          url: 'https://www.didu86.com/Clothes-manager-web/codenum',
          data: {
            tel: phone,
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
  }
})

function firstStep() { // 提交电话号码，获取［验证码］  
  if (!check.checkPhoneNum(phoneNum)) {
    hintMsg = "请输入正确的电话号码!"
    return false
  }

  if (webUtils.submitPhoneNum(phoneNum)) {
    hintMsg = null
    return true
  }
  hintMsg = "提交错误，请稍后重试!"
  return false
}

function secondStep() { // 提交［验证码］  
  if (!check.checkIsNotNull(identifyCode)) {
    hintMsg = "请输入验证码!"
    return false
  }

  if (webUtils.submitIdentifyCode(identifyCode)) {
    hintMsg = null
    return true
  }
  hintMsg = "提交错误，请稍后重试!"
  return false
}

function thirdStep() { // 提交［密码］和［重新密码］  

  console.log(password + "===" + rePassword)

  if (!check.isContentEqual(password, rePassword)) {
    hintMsg = "两次密码不一致！"
    return false
  }

  if (webUtils.submitPassword(password)) {
    hintMsg = "注册成功"
    return true
  }
  hintMsg = "提交错误，请稍后重试!"
  return false
}  