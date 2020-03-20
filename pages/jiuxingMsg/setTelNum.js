var appInstance = getApp();
var memberid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guiji_items: [
      { name: '是', value: '1', checked: 'true' },
      { name: '否', value: '0' }
    ]
  },
  //轨迹
  guijiChange: function (e) {
    console.log(e.detail.value);
    this.setData({ alowGuiji: e.detail.value });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: appInstance.globalData.serverUrl + 'weixinSmall!toVehicleSetting', //仅为示例，并非真实的接口地址
      data: { id: options.id},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var query_clone = res.data[0];
        console.log(query_clone);
        if (query_clone.flg == 0) {
          wx.navigateTo({
            url: '../login/login'
          })
        }
        that.setData({
          id: query_clone.vipMember.memberid,
          shebeiNum1: query_clone.vipMember.shebeiNum1,
          shebeiNum2: query_clone.vipMember.shebeiNum2,
          alowGuiji: query_clone.vipMember.guijiFlag
        });
        memberid = query_clone.vipMember.memberid;
        var guijiList = that.data.guiji_items//获取Json数组
        var alowGuiji = query_clone.vipMember.guijiFlag;
        for (var i = 0; i < guijiList.length; i++) {
          if (guijiList[i].value == alowGuiji) {
            guijiList[i].checked = true;
          }
          else {
            guijiList[i].checked = false;
          }
        }
        that.setData({
          guiji_items: guijiList
        })
      }
    });
    this.WxValidate = appInstance.wxValidate(
      {
        tel1: {
          tel: true
        },
        tel2: {
          tel: true
        },
        alowGuiji: {
          required: true
        }
      },
      {
        tel1: {
          tel: '请输入正确的手机号'
        },
        tel2: {
          tel: '请输入正确的手机号'
        },
        alowGuiji: {
          required: '请选择是否上传轨迹'
        }
      }
    )
  },
  // 登录  
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value.alowGuiji);
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showModal({
        content: `${error.msg} `,
        duration: 2000
      })
      return false
    } else {
      // 这里修改成跳转的页面  
      console.log(memberid+"===============")
      wx.request({
        url: appInstance.globalData.serverUrl + 'weixinSmall!saveVehicleSetting', //仅为示例，并非真实的接口地址
        data: {
          "id": memberid,
          "shebeiNum1": e.detail.value.tel1,
          "shebeiNum2": e.detail.value.tel2,
          "guijiFlag": e.detail.value.alowGuiji
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res);
          var query_clone = res.data[0];
          console.log(query_clone);
          if (query_clone.flg == '0') {
            wx.showModal({
              content: query_clone.message,
              duration: 2000
            })
          } else {
            wx.showToast({
              title: "提交成功",
              icon: 'success',
              duration: 2000
            })
            wx.switchTab({
              url: '../pages/jiuxingMsg/shebeiList'
            })
          }
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '设置通话号码'
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})