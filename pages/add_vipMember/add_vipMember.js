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
console.log("当前时间：" + Y + "-" + M + "-"+ D );  
var serviceYear;//服务年限
var couponNum;//赠送天数
var beginDate, serviceEndTime;
var testData;
var orderId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectPerson: true,
    objectArray: ['烟台', '青岛', '济南', '菏泽', '淄博', '枣庄', '东营', '潍坊', '济宁', '泰安', '威海', '日照', '滨洲', '德州', '聊城', '临沂', '莱芜'],
    index: 0,
    selectArea: false,
    items: [
      { name: 'boy', value: '男', checked: 'true'  },
      { name: 'girl', value: '女'}
    ],
    radioStr: '男',
    stratTime:nowDate,
    beginDate: '',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2500,
    endTime:'2500-01-01',
    memberInfo:'',
    serviceYear:"",
    flag: true,//协议
    serviceTimeFlag:true,//服务时间
    xieyi: [
      { name: '我已阅读并同意《九九九空中救护会员服务协议》', value: '0', checked: true }
    ],
    disabled: false,
    testData: { name:name} 
  },
  //性别
  radioChange: function (e) {
    var str = null;
    for (var value of this.data.items) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({ radioStr: str });
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
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    console.log("options.orderId：" + options.orderId);
    orderId=options.orderId
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
     
    });
    var that = this;
    wx.request({
      url: 'https://teach.hems999.com/weixinSmall!toMember', //仅为示例，并非真实的接口地址
      data: { orderId: options.orderId},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("获取服务时间");
        var query_clone = res.data[0];
        console.log(query_clone.couponNum);
        serviceYear = query_clone.serviceYear;
        couponNum = query_clone.couponNum;
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
        url: 'https://teach.hems999.com/weixinSmall!addMember', //仅为示例，并非真实的接口地址
        data: {
          formData: JSON.stringify(formData),
          orderId: orderId,
          sessionId:value
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
         
          var query_clone = res.data[0];
          if (query_clone.flg == 1) {
            console.log("保存个人信息成功");
            wx.navigateTo({
              url: '../add_jiankang/add_jiankang?orderId=' + orderId + '&vipNumberId=' + query_clone.vipMemberId
            })
          } else{
            console.log("保存个人信息失败");
          }
        }
      });
    }
  },
  //服务生效时间
  changeDate(e) {
    beginDate = e.detail.value;
    this.setData({ 
      beginDate: e.detail.value,
      serviceTimeFlag:false
    });
    
    if (serviceYear == "0") {
      //微信赠送天数计算
      beginDate = beginDate.replace(/-/g, "/");
      beginDate = new Date(beginDate.valueOf());
      
      var newDate = new Date(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate() + parseInt(couponNum) - 1);
      
      var year2 = newDate.getFullYear();
      var month2 = newDate.getMonth() + 1;
      var day2 = newDate.getDate();
      console.log(year2)
      if (month2 < 10) {
        month2 = "0" + month2;
      }
      if (day2 < 10) {
        day2 = "0" + day2;
      }
      serviceEndTime = year2 + '-' + month2 + '-' + day2;
      this.setData({
        serviceEndTime: serviceEndTime
      });
    }else{
      ////产品保障时间计算
      beginDate = beginDate.replace(/-/g, "/");
      beginDate = new Date(beginDate.valueOf());
      var startYear = beginDate.getFullYear();
      var startMonth = beginDate.getMonth();
      var startDay = beginDate.getDate();
      var endDate = beginDate;
      endDate.setFullYear(endDate.getFullYear() + parseInt(serviceYear));
      endDate.setDate(endDate.getDate() - 1);
      var month = endDate.getMonth() + 1;
      if (endDate.getMonth() < 9) {
        month = "0" + (endDate.getMonth() + 1);
      }
      var date = endDate.getDate()
      if (endDate.getDate() < 10) {
        date = "0" + endDate.getDate();
      }
      serviceEndTime = endDate.getFullYear() + '-' + month + '-' + date;
      this.setData({
        serviceEndTime: serviceEndTime
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
      title: '个人信息'
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