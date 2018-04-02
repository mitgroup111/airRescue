// pages/add_vipMember/add_vipMember.js
var appInstance = getApp();
var dateTimePicker = require('../../utils/dateTimePicker.js');
var timestamp = Date.parse(new Date());
timestamp = timestamp / 1000;
console.log("当前时间戳为：" + timestamp);
var n = timestamp * 1000;
var date1 = new Date(n);
//年  
var Y = date1.getFullYear();
//月  
var M = (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1);
//日  
var D = date1.getDate() < 10 ? '0' + date1.getDate() : date1.getDate();
var nowDate = Y + "-" + M + "-" + D;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectPerson: true,
    objectArray: ['烟台', '青岛', '济南', '菏泽', '淄博', '枣庄', '东营', '潍坊', '济宁', '泰安', '威海', '日照', '滨洲', '德州', '聊城', '临沂', '莱芜'],
    index: 0,
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2500,
    endTime: '2500-01-01',
  },
  //城市
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    wx.request({
      url: 'https://www.arsauto.com.cn/car/getbrand.do?jsonpCallback=', //仅为示例，并非真实的接口地址
      data: { orderId: options.orderId },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("获取服务时间111");
        var query_clone = res.data;
        console.log(query_clone);
      }
    });
    
    this.WxValidate = appInstance.wxValidate(
      {
        name: {
          required: true,
          rangelength: [2, 8]
        },
        userName: {
          required: true,
          digits: true,
          rangelength: [11, 11],
          tel: true
        },
        idcard: {
          required: true,
          idcard: true
        },
        address: {
          required: true,
          rangelength: [2, 30]
        },
        emergencyName: {
          required: true,
          rangelength: [2, 8]
        },
        emergencyTel: {
          required: true,
          digits: true,
          rangelength: [11, 11],
          compareTel: true
        },
        beginDate: {
          required: true
        },
        xieyibox: {
          required: true
        }
      },
      {
        name: {
          required: "请输入姓名",
          rangelength: "姓名为2-8个字"
        },
        userName: {
          required: "请输入手机号码",
          digits: "手机号码请输入数字",
          rangelength: "手机号码为11位",
          tel: "请输入正确的手机号"
        },
        idcard: {
          required: "请输入您的身份证号码",
          idcard: "身份证号码不合法"
        },
        sex: {
          required: "请选择性别"
        },
        address: {
          required: "请输入地址",
          rangelength: "地址为2-30个字"
        },
        emergencyName: {
          required: "请输入紧急联系姓名",
          rangelength: "姓名为2-8个字"
        },
        emergencyTel: {
          required: "请输入紧急联系人的手机号码",
          digits: "手机号码请输入数字",
          rangelength: "手机号码为11位",
          compareTel: "请输入正确的手机号码"
        },
        beginDate: {
          required: "请选择服务开通时间"
        },
        xieyibox: {
          required: "请确认您已阅读并同意《九九九空中救护会员服务协议》"
        }
      }
    )
  },
  // 提交 
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    console.log(formData);
    var that = this;
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
      var that = this;
      console.log("保存个人信息orderId:" + orderId);
      wx.request({
        url: 'https://www.hems999.com/weixinSmall!addMember', //仅为示例，并非真实的接口地址
        data: {
          formData: JSON.stringify(formData),
          orderId: orderId,
          sessionId: value
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log("保存个人信息成功");

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
      title: '车辆信息'
    }),
      this.setData({ disabled: false })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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