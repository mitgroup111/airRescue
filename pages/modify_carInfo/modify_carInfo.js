// pages/add_vipMember/add_vipMember.js
var appInstance = getApp();
var dateTimePicker = require('../../utils/dateTimePicker.js');
var timestamp = Date.parse(new Date());
timestamp = timestamp / 1000;
var n = timestamp * 1000;
var date1 = new Date(n);
//年  
var Y = date1.getFullYear();
//月  
var M = (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1);
//日  
var D = date1.getDate() < 10 ? '0' + date1.getDate() : date1.getDate();
var nowDate = Y + "-" + M + "-" + D;
var orderId, carId, carBrand, carModel, carSeries, carYear, color, baoxianCom, ifBaoxian;
var brandArray, brandName, brand = -1;
var seriesArray, seriesName, series;
var modelArray, modelName, model;
var yearArray, yearName, year;
var safeArray, safeName, safe = -1, safeArrayStr, otherSafe, safeName1, bxStartTime, colorArray1;
var colorArray1=['黑色', '白色', '红色', '蓝色', '黄色', '银色', '紫色', '金色', '其他']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArray:'',
    color: 0,
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2500,
    endTime: '2500-01-01',
    tempFilePaths: 'http://www.hems999.com/jsp/images/car.jpg',
    safeFlag:true,
    othersafeFlag:true,
    bxStartTime:"",
    bxEndTime:"",
    safeRadio:""
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
    carId = options.carId;
    wx.request({
      url: appInstance.globalData.serverUrl + 'weixinSmall!toEditCar', //仅为示例，并非真实的接口地址
      data: { 
        //orderId: options.orderId, 
        //carId: options.carId 
        orderId: "0019062110193421",
        carId: "762" 
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var query_clone = res.data[0].caru;
        carBrand = query_clone.carBrand;
        carSeries = query_clone.carSeries;
        carModel = query_clone.carModel;
        carYear = query_clone.carYear;
        color = query_clone.color;
        baoxianCom = query_clone.baoxianCom;
        ifBaoxian = query_clone.ifBaoxian
        that.setData({    
          shangpaiTime: query_clone.shangpaiTime,
          vin: query_clone.vin,
          card: query_clone.card,
          meleage: query_clone.meleage,
          safeRadio: query_clone.ifBaoxian,
          bxStartTime: res.data[0].bxStartTime,
          bxEndTime: res.data[0].bxEndTime
        });
        //品牌赋值
        wx.request({
          url: 'https://www.arsauto.com.cn/car/getBrandWeiSmall.do', //仅为示例，并非真实的接口地址
          data: { orderId: options.orderId },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log("获取品牌");
            brandArray = res.data;
            that.setData({ brandArray: brandArray });
            
            for (var i = 0; i < brandArray.length; i++) {
              if (carBrand == brandArray[i]) {
                that.setData({
                  brand:i
                })
              }
            }
          }
        });
        //车系赋值
        wx.request({
          url: 'https://www.arsauto.com.cn/car/getseriesWeiSmall.do?car_brand=' + escape(carBrand), //仅为示例，并非真实的接口地址
          data: {},
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            seriesArray = res.data;
            that.setData({ seriesArray: seriesArray });
            for (var i = 0; i < seriesArray.length; i++) {
              if (carSeries == seriesArray[i]) {
                that.setData({
                  series: i
                })
              }
            }
          }
        });
        //车型赋值
        wx.request({
          url: 'https://www.arsauto.com.cn/car/getModelWeiSmall.do?car_brand=' + escape(carBrand) + '&car_series=' + escape(carSeries),
          data: {},
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            modelArray = res.data;
            that.setData({ modelArray: modelArray });
            for (var i = 0; i < modelArray.length; i++) {
              if (carModel == modelArray[i]) {
                that.setData({
                  model: i
                })
              }
            }
          }
        });
        //出厂日期赋值
        wx.request({
          url: 'https://www.arsauto.com.cn/car/getYearWeiSmall.do?car_brand=' + escape(carBrand) + '&car_series=' + escape(carSeries) + '&car_model=' + escape(carModel),
          data: {},
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            yearArray = res.data;
            that.setData({ yearArray: yearArray });
            for (var i = 0; i < yearArray.length; i++) {
              if (carYear == yearArray[i]) {
                that.setData({
                  year: i
                })
              }
            }
          }
        });
        that.setData({ colorArray: colorArray1});
        //颜色赋值
        for (var i = 0; i < colorArray1.length; i++) {
          if (color == colorArray1[i]) {
            that.setData({
              color: i
            })
          }
        }
        //加载保险公司
        wx.request({
          url: appInstance.globalData.serverUrl + 'baoxianList',//仅为示例，并非真实的接口地址
          data: {},
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            safeArrayStr = "";
            for (var i = 0; i < res.data.length; i++) {
              safeArrayStr += res.data[i]['name'] + ",";
            }
            safeArray = safeArrayStr.split(",");
            that.setData({ safeArray: safeArray });
            if (ifBaoxian == "是") {
              that.setData({ safeFlag: false });
              for (var i = 0; i < safeArray.length; i++) {
                if (baoxianCom == safeArray[i]) {
                  that.setData({
                    safe: i,
                    safeName: baoxianCom
                  })
                }

              }
              if (safeArrayStr.indexOf(baoxianCom)==-1){
                that.setData({
                  safe: safeArray.length - 2,
                  othersafeFlag: false,
                  otherSafe: baoxianCom,
                  safeName: "其他"
                })
              }
              
            } else {
              that.setData({
                safeFlag: true,
                othersafeFlag: true,
                otherSafe: "",
                safeName: "",
                bxStartTime: "",
                bxEndTime: "",
                safe: ""
              });
            }
          }
        });
        
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
        },
        safeName:{
          equalToRadioYes: "ifBaoxian"
        },
        bxStartTime: {
          equalToRadioYes: "ifBaoxian"
        },
        baoxianCom:{
          equalToSelectOther:"safeName",
          maxlength: 30
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
        },
        safeName: {
          equalToRadioYes: "请选择保险公司"
        },
        bxStartTime: {
          equalToRadioYes: "请选择保险开始时间"
        },
        baoxianCom: {
          equalToSelectOther: "请输入其他保险公司",
          maxlength: "保险公司最长为30"
        }

      }
    )
  },
  //是否选择保险公司代报案
  safeRadio: function (e) {
    var that = this;
    this.setData({ safeRadio: e.detail.value });
    if (e.detail.value=="是") {
      this.setData({ safeFlag: false });
      if (safeName1 == "其他") {
        this.setData({ 
          othersafeFlag: false, 
          otherSafe: "",
          safeName:"其他"
        });
      }
    } else {
      this.setData({ 
        safeFlag: true,
        othersafeFlag: true,
        otherSafe:"",
        safeName:"",
        bxStartTime:"",
        bxEndTime:"",
        safe:""
      });
    }
  },
  //保险公司名称
  bindsafeChange: function (e) {
    this.setData({
      safe: e.detail.value  //下标
    })
    safeName1 = safeArray[e.detail.value];
    otherSafe=safeName1;
    this.setData({ 
      otherSafe: safeName,
      safeName: safeName1
    });
    if(safeName1=="其他"){
      this.setData({ 
        othersafeFlag: false,
        otherSafe: "" 
      });
    }else{
      this.setData({ 
        othersafeFlag: true,
        otherSafe: safeName1
      });
    }
  },
  //车辆颜色
  bindColorChange: function (e) {
    this.setData({
      color: e.detail.value
    })
  },
  //保险开始时间
  changebxDate(e) {
    bxStartTime = e.detail.value;
    this.setData({
      bxStartTime: e.detail.value
    });
    bxStartTime = bxStartTime.replace(/-/g, "/");
    bxStartTime = new Date(bxStartTime.valueOf());
    var startYear = bxStartTime.getFullYear();
    var startMonth = bxStartTime.getMonth();
    var startDay = bxStartTime.getDate();
    var bxEndTime = bxStartTime;
    bxEndTime.setFullYear(bxEndTime.getFullYear() + parseInt(1));
    bxEndTime.setDate(bxEndTime.getDate() - 1);
    var month = bxEndTime.getMonth() + 1;
    if (bxEndTime.getMonth() < 9) {
      month = "0" + (bxEndTime.getMonth() + 1);
    }
    var date = bxEndTime.getDate()
    if (bxEndTime.getDate() < 10) {
      date = "0" + bxEndTime.getDate();
    }
    bxEndTime = bxEndTime.getFullYear() + '-' + month + '-' + date;
    this.setData({
      bxEndTime: bxEndTime
    });
  },
  //根据品牌加载车系
  bindBrandChange: function (e) {
    var that = this;
    this.setData({
      brand: e.detail.value
    })
    carBrand = brandArray[e.detail.value];
    wx.request({
      url: 'https://www.arsauto.com.cn/car/getseriesWeiSmall.do?car_brand=' + escape(carBrand), //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        seriesArray = res.data;
        that.setData({ 
          seriesArray: seriesArray,
          series:"",
          model:"",
          year:""
        });
      }
    });
  },
  //根据品牌和车系加载车型
  bindSeriesChange: function (e) {
    var that = this;
    this.setData({
      series: e.detail.value
    })
    carSeries = seriesArray[e.detail.value];
    wx.request({
      url: 'https://www.arsauto.com.cn/car/getModelWeiSmall.do?car_brand=' + escape(carBrand) + '&car_series=' + escape(carSeries), //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        modelArray = res.data;
        console.log("车型：" + res.data);
        that.setData({ 
          modelArray: modelArray,
          model: "",
          year: ""
        });
      }
    });
  },
  //根据品牌、车系、车型加载出厂日期
  bindModelChange: function (e) {
    var that = this;
    this.setData({
      model: e.detail.value
    })
    carModel = modelArray[e.detail.value];
    wx.request({
      url: 'https://www.arsauto.com.cn/car/getYearWeiSmall.do?car_brand=' + escape(carBrand) + '&car_series=' + escape(carSeries) + '&car_model=' + escape(carModel), //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        yearArray = res.data;
        console.log("出厂日期：" + res.data);
        that.setData({ 
          yearArray: yearArray,
          year: ""
        });
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
      console.log("JSON.stringify(formData):" + JSON.stringify(formData));
      wx.request({
        url: appInstance.globalData.serverUrl +'weixinSmall!editCar', //仅为示例，并非真实的接口地址
        data: {
          formData: JSON.stringify(formData),
          orderId: orderId,
          sessionId: value,
          carId: carId
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var query_clone = res.data[0];
         console.log("修改信息成功")
          console.log(query_clone.flg)
          if (query_clone.flg==1){
            wx.navigateTo({
              url: '../order/order'
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