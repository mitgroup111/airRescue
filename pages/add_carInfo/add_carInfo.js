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
var orderId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectPerson: true,
    brandArray:'',
    colorArray: ['黑色', '白色', '红色', '蓝色', '黄色', '银色', '紫色', '金色', '其他'],
    brand: 0,
    color:0,
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2500,
    endTime: '2500-01-01',
    tempFilePaths: 'http://www.hems999.com/jsp/images/car.jpg'  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.arsauto.com.cn/car/getbrand.do', //仅为示例，并非真实的接口地址
      data: { orderId: options.orderId },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("获取品牌");
        var brandArray = res.data;
        console.log(res.data);
        that.setData({ brandArray: brandArray});
      }
    });
    //将图片上传到服务器
    /*wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址  
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something  
          }
        })
      }
    }) */
    this.WxValidate = appInstance.wxValidate(
      {
        card: {
          isCarCard: true,
          rangelength: [7, 7]
        },
        meleage: {
          isNum: true,
          rangelength: [1, 7]
        },
        vin: {
          isVIN: true,
          rangelength: [17, 17]
        }
      },
      {
        card: {
          isCarCard: "请输入正确的车牌号",
          rangelength: "车牌号长度为7位"
        },
        meleage: {
          isNum: "请输入正确的里程数（整数）",
          rangelength: "里程数长度最多为7个字符"
        },
        vin: {
          isVIN: "请输入正确的VIN码",
          rangelength: "输入的VIN码位数不正确"
        }

      }
    )
  },
  //车辆颜色
  bindColorChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      color: e.detail.value
    })
  },
  //品牌
  bindBrandChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      brand: e.detail.value
    })
    wx.request({
      url: 'https://www.arsauto.com.cn/car/getseries.do?car_brand=encodeURI(奥迪（一汽）)', //仅为示例，并非真实的接口地址
      data: { brand: "奥迪（一汽）" },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //console.log("---" + brandArray[brand]);
        var carSeriesArray = res.data;
        console.log(res.data);
        //this.setData({ carSeriesArray: carSeriesArray });
      }
    });
  },
  //车系
  bindcarSeriesChange: function (e) {
    
    console.log(e.detail.value)
    this.setData({
      brand: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  changeDate: function (e) {
    console.log(e.detail.value)
    this.setData({
      shangpaiTime: e.detail.value
    })
  },
  //选择照片
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
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
      //console.log("保存个人信息orderId:" + orderId);
      wx.request({
        url: 'https://www.easy-mock.com/mock/5aaf72f00aef8a4466633f5c/weixinSmall!toCar', //仅为示例，并非真实的接口地址
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