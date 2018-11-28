var appInstance = getApp();
var currentTime = 60; //倒计时的事件（单位：s） 
var timer = 1;
var mobile, identifyCode,flag;
Page({
  data: {
    time: currentTime,
    getmsg: "获取验证码",
    mobileMsg:"false"
  },
  onLoad: function () {
    this.WxValidate = appInstance.wxValidate(
      {
        mobile: {
          required: true,
          tel: true
        },
        valiCode: {
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
          tel: '请输入正确的手机号'
        },
        valiCode: {
          required: '请输入手机验证码'
        },
        password: {
          required: '请输入密码',
          minlength: '密码至少为6位',
          maxlength: '密码至多为20位',
        },
        repassword: {
          required: '请输入确认密码',
          equalTo: '请输入相同的密码'
        }
      }
    )
  },
  //表单提交
  formSubmit: function (e) {
    var that = this
    const params=e.detail.value;
    console.log("每个值"+params);
    identifyCode = e.detail.value.valiCode;
    var huozheng = this.data.huozheng
    //提交错误描述
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      // `${error.param} : ${error.msg} `
      //that.valiCodeBlurFocus();
      wx.showModal({
        content: `${error.msg} `,
        duration: 2000
      })
    } else if (identifyCode != huozheng){
        wx.showModal({
          content: '输入验证码有误',
          showCancel: false,
          success: function (res) {
          }
        })
    }
    else{
      that.setData({ submitHidden: false })
      var value = wx.getStorageSync('sessionId');
      //提交
      wx.request({
        url: appInstance.globalData.serverUrl +'weixinSmall!weixinRegisterMobile',
        data: {
          Mobile: e.detail.value.mobile,
          password: e.detail.value.password,
          sessionId: value
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({ submitHidden: true })
          // appInstance.userState.status = 0
          // wx.navigateBack({
          //   delta: 1
          // })
          var query_clone = res.data[0];
          console.log("query_clone:" + query_clone);
          wx.setStorageSync('mobile', query_clone.username);//存手机号
          if (query_clone.flg == 1) {
            wx.showToast({
              title: query_clone.message,
              icon: 'success',
              duration: 2000
            })
            wx.switchTab({
              url: '../index/index',
            })
          }
        },
        fail: function () {
        },
        complete: function () {
        }
      })
    }
    
  },
  onUnload: function () {
    currentTime = 60
  },
  //手机验证码
  valiCodeBlurFocus: function (e) {
    identifyCode = e.detail.value;
    var that = this;
    var huozheng = this.data.huozheng
    console.log("验证码---" + huozheng)
    that.setData({
      identifyCode: identifyCode,
      zhengTrue: false,
    })
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
  },
  //获取手机号
  mobileBlurFocus: function (e) {
    this.setData({
      mobile: e.detail.value
    })
    console.info("手机号----" + this.data.mobile);
  },
  //获取验证码按钮
  reSendPhoneNum: function (e) {
    var that = this;
    var n = 59;
    var user = wx.getStorageSync('user');
    var mobile = that.data.mobile;
    console.log("mobile:" + mobile);
    wx.request({
      url: appInstance.globalData.serverUrl +'weixinSmall!getMobileCode',
      data: {
        mobile: mobile,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var result = res.data[0];
        console.log(" 验证码:" + res.data[0].code);
        
        flag = result.flg;  //判断是否已经注册flag为1时没注册
        console.log("手机号和res.flg值:" + mobile+"-----"+result.flg);
        if (result.flg == 1) {
          that.setData({
            huozheng: result.code
          })
          if (!(/^1[34578]\d{9}$/.test(mobile))) {
            wx.showModal({
              content: '请输入正确的手机号',
              success: function (res) {
                if (res.confirm) {
                  console.log('请输入正确的手机号')
                }
              }
            })
          } else {
            if (timer == 1) {
              timer = 0;
              var time = 59;
              that.setData({
                sendmsg: "sendmsgafter",
                mobileMsg: true
              })
              var inter = setInterval(function () {
                that.setData({
                  getmsg: time + "s后重新发送"
                })
                time--;
                if (time < 0) {
                  timer = 1
                  clearInterval(inter)
                  that.setData({
                    sendmsg: "sendmsg",
                    getmsg: "获取验证码",
                    mobileMsg: false
                  })
                }
              }, 1000)
            }
          }
        }else {
          wx.showModal({
            content: result.message,
            showCancel: false,
            success: function (res) {
              console.log('flg为0时已注册')
            }
          })
        }
        
      }
    })
    
    

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '注册'
    })
    this.setData({
      mobileMsg: false
    })
  },
})