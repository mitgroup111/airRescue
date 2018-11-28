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
var orderId;
var brandArray, brandName, brand = -1;
var seriesArray, seriesName, series;
var modelArray, modelName, model;
var yearArray, yearName, year;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArray: ['黑色', '白色', '红色', '蓝色', '黄色', '银色', '紫色', '金色', '其他'],
    color: 0,
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

  //将图片上传到服务器
  test: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.info("tempFilePaths:" + tempFilePaths[0]);
        wx.uploadFile({
          url: appInstance.globalData.serverUrl +'weixinSmallUpload', //仅为示例，非真实的接口地址  
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          header: {
            'content-type': 'multipart/form-data'
          },
          success: function (res) {
            var query_clone = res.data;
            console.info("res:" + query_clone);
            that.setData({
              src: query_clone
            })

          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    orderId = options.orderId;
    wx.request({
      url: 'https://www.arsauto.com.cn/car/getBrandWeiSmall.do', //仅为示例，并非真实的接口地址
      data: { orderId: options.orderId },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("获取品牌");
        brandArray = res.data;
        console.log(res.data);
        that.setData({ brandArray: brandArray });
      }
    });
   
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
  //根据品牌加载车系
  bindBrandChange: function (e) {
    var that = this;
    this.setData({
      brand: e.detail.value
    })
    brandName = brandArray[e.detail.value];
    console.log("brandName:" + brandName);
    wx.request({
      url: 'https://www.arsauto.com.cn/car/getseriesWeiSmall.do?car_brand=' + escape(brandName), //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        seriesArray = res.data;
        console.log("车系：" + res.data);
        that.setData({ seriesArray: seriesArray });
      }
    });
  },
  //根据品牌和车系加载车型
  bindSeriesChange: function (e) {
    var that = this;
    this.setData({
      series: e.detail.value
    })
    seriesName = seriesArray[e.detail.value];
    wx.request({
      url: 'https://www.arsauto.com.cn/car/getModelWeiSmall.do?car_brand=' + escape(brandName) + '&car_series=' + escape(seriesName), //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        modelArray = res.data;
        console.log("车型：" + res.data);
        that.setData({ modelArray: modelArray });
      }
    });
  },
  //根据品牌、车系、车型加载出厂日期
  bindModelChange: function (e) {
    var that = this;
    this.setData({
      model: e.detail.value
    })
    yearName = modelArray[e.detail.value];
    wx.request({
      url: 'https://www.arsauto.com.cn/car/getYearWeiSmall.do?car_brand=' + escape(brandName) + '&car_series=' + escape(seriesName) + '&car_model=' + escape(yearName), //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        yearArray = res.data;
        console.log("出厂日期：" + res.data);
        that.setData({ yearArray: yearArray });
      }
    });
  },
  //选择出厂日期
  bindYearChange: function (e) {
    var that = this;
    this.setData({
      year: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  changeDate: function (e) {
    console.log(e.detail.value)
    this.setData({
      shangpaiTime: e.detail.value
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
      console.log("保存个人信息orderId:" + orderId);
      console.log("JSON.stringify(formData):" + JSON.stringify(formData));
      wx.request({
        url: appInstance.globalData.serverUrl +'weixinSmall!saveCar', //仅为示例，并非真实的接口地址
        data: {
          formData: JSON.stringify(formData),
          orderId: orderId,
          sessionId: value
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var query_clone = res.data[0];
         
          if (query_clone.flg==1){
            console.log("保存个人信息成功");
          if (query_clone.to == 'toCode') {
            wx.navigateTo({
              url: '../code/code?orderId=' + orderId
            })
          }
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