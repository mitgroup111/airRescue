var appInstance = getApp();
var flag;
Page({
  data: {
    mobileMsg:"false"
  },
  onLoad: function () {
    this.WxValidate = appInstance.wxValidate(
      {
        old_password: {
          required: true,
          minlength: 6,
          maxlength: 20,
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
        old_password: {
          required: '请输入原密码',
          minlength: '密码至少为6位',
          maxlength: '密码至多为20位',
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
    } else{
      that.setData({ submitHidden: false })
      var value = wx.getStorageSync('sessionId');
      //提交
      wx.request({
        url: appInstance.globalData.serverUrl +'weixinSmall!modify_password',
        data: {
          old_password: e.detail.value.old_password,
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
          if (query_clone.flg == 1) {
            wx.showToast({
              title: query_clone.message,
              icon: 'success',
              duration: 2000
            })
            wx.navigateBack({
              delta: 1
            })
          } else {
            wx.showToast({
              title: query_clone.message,
              icon: 'none',
              duration: 2000
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '修改密码'
    })
    this.setData({
      mobileMsg: false
    })
  },
})