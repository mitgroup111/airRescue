var appInstance = getApp();
var vipNumJilu, vipNum, vipMemberId,orderId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blood_items: [
      { name: 'A', value: 'A型' },
      { name: 'B', value: 'B型' },
      { name: 'O', value: 'O型' },
      { name: 'AB', value: 'AB型' },
      { name: 'NO', value: '不详' }
    ],
    bloodRH_items: [
      { name: '否', value: '否' },
      { name: '是', value: '是' },
      { name: 'NO', value: '不详' } 
    ],
    medical_items: [
      { value: '城镇职工基本医疗保险' },
      { value: '城镇居民基本医疗保险' },
      { value: '新型农村合作医疗' },
      { value: '贫困救助' },
      { value: '商业医疗保险' },
      { value: '全公费' },
      { value: "全自费" },
      { value: "其他" }
    ],
    qitamedicalFlag: true,
    allergyFlag: true, //药物过敏史
    guomingshi: false,
    qitaallergyFlag: true,
    diseaseFlag: true,
    jibing: false,
    qitadiseaseFlag: true,
    operationFlag: true,
    traumaFlag: true,
    transfusionFlag: true,
    memberInfo: '',
    disabled: false
  },
  //血型
  bloodChange: function (e) {
    console.log(e.detail.value);
    this.setData({ blood: e.detail.value });
  },
  //血型RH
  bloodRHChange: function (e) {
    this.setData({ bloodRH: e.detail.value });
  },
  //医疗费用支付方式
  medicalChange: function (e) {
    this.setData({ medical: e.detail.value });
    if (e.detail.value.indexOf("其他") != -1) {
      this.setData({ qitamedicalFlag: false });
    } else {
      this.setData({ qitamedicalFlag: true });
      this.setData({ qita: "" });
    }
  },
  //是否有药物过敏史
  allergyChange: function (e) {
    this.setData({ allergy: e.detail.value });
    if (e.detail.value == "有") {
      this.setData({ allergyFlag: false });
    } else {
      this.setData({ 
        allergyFlag: true,
        allergyCheck: "",
        allergyCheckText: "",
        guomingshi: false
      });
    }
  },
  allergyCheckChange: function (e) {
    this.setData({ allergyCheck: e.detail.value });
    if (e.detail.value.indexOf("其他") != -1) {
      this.setData({ qitaallergyFlag: false });
    } else {
      this.setData({ 
        qitaallergyFlag: true,
        allergyCheckText: ""
      });
    }
  },
  //是否有疾病
  diseaseChange: function (e) {
    this.setData({ disease: e.detail.value });
    if (e.detail.value == "有") {
      this.setData({ diseaseFlag: false });
    } else {
      this.setData({ 
        diseaseFlag: true,
        diseaseCheck: "",
        diseaseCheckText: "",
        jibing: false
      });
    }
  },
  diseaseCheckChange: function (e) {
    //console.log(e.detail.value);
    //console.log(e.detail.value.indexOf("其他"));
    this.setData({ diseaseCheck: e.detail.value });
    if (e.detail.value.indexOf("其他") != -1) {
      this.setData({ qitadiseaseFlag: false });
    } else {
      this.setData({ qitadiseaseFlag: true });
      this.setData({ diseaseCheckText: "" });
    }
  },
  //是否有手术
  operationChange: function (e) {
    this.setData({ operation: e.detail.value });
    if (e.detail.value == "有") {
      this.setData({ operationFlag: false });
    } else {
      this.setData({ operationFlag: true });
      this.setData({ operationText: "" });
    }
  },
  //是否有外伤
  traumaChange: function (e) {
    this.setData({ trauma: e.detail.value });
    if (e.detail.value == "有") {
      this.setData({ traumaFlag: false });
    } else {
      this.setData({ traumaFlag: true });
      this.setData({ traumaText: "" });
    }
  },
  //是否有输血
  transfusionChange: function (e) {
    this.setData({ transfusion: e.detail.value });
    if (e.detail.value == "有") {
      this.setData({ transfusionFlag: false });
    } else {
      this.setData({ transfusionFlag: true });
      this.setData({ transfusionText: "" });
    }
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  isTakeChild() {
    if (medical == '其他') {
      return true;
    } else {
      return false;
    }
  },

  onLoad: function (options) {
    var that = this;
    orderId = options.orderId;
    wx.request({
      url: appInstance.globalData.serverUrl +'weixinSmall!toJiaren', //仅为示例，并非真实的接口地址
      data: { orderId: options.orderId },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("获取家人信息");
        var query_clone = res.data[0];
        console.log(query_clone.vipNumJilu);
        vipNumJilu = query_clone.vipNumJilu;
        vipNum = query_clone.vipNum;
        vipMemberId = query_clone.vipMemberId;
        that.setData({
          vipNumJilu: vipNumJilu,
          vipNum: vipNum,
        });
      }
    });
    this.WxValidate = appInstance.wxValidate(
      {
        name: {
          required: true,
          rangelength: [2, 8]
        },
        idcard: {
          required: true,
          idcard: true
        },
        blood: {
          required: true
        },
        bloodRH: {
          required: true
        },
        userheight: {
          required: true,
          isNum: true,
          maxlength: 6
        },
        userweight: {
          required: true,
          isNum: true,
          maxlength: 6
        },
        medicalHid: {
          required: true
        },
        qitamedical: {
          equalToCheckbox: "medicalHid",
          maxlength: 100
        },
        allergy: {
          required: true
        },
        allergyCheckHid: {
          equalToRadio: "allergy"
        },
        qitaallergyCheck: {
          equalToCheckbox: "allergyCheckHid",
          maxlength: 100
        },
        disease: {
          required: true
        },
        diseaseCheckHid: {
          equalToRadio: "disease"
        },
        qitadiseaseCheck: {
          equalToCheckbox: "diseaseCheckHid",
          maxlength: 100
        },
        operation: {
          required: true
        },
        operationName: {
          equalToRadio: "operation",
          maxlength: 100
        },
        trauma: {
          required: true
        },
        traumaName: {
          equalToRadio: "trauma",
          maxlength: 100
        },
        transfusion: {
          required: true
        },
        transfusionName: {
          equalToRadio: "transfusion",
          maxlength: 100
        }
      },
      {
        name: {
          required: "请输入姓名",
          rangelength: "姓名为2-8个字"
        },
        idcard: {
          required: "请输入您的身份证号码",
          idcard: "身份证号码不合法"
        },
        blood: {
          required: "请选择血型"
        },
        bloodRH: {
          required: "请选择是否为RH阴性"
        },
        userheight: {
          required: "请输入身高（cm）",
          isNum: "请输入正确的身高（整数）",
          maxlength: "身高最多为6位"
        },
        userweight: {
          required: "请输入体重（kg）",
          isNum: "请输入正确的体重（整数）",
          maxlength: "体重最多为6位"
        },
        medical: {
          required: "请选择医疗费用支付方式"
        },
        qitamedical: {
          equalToCheckbox: "请输入其他支付方式",
          maxlength: "支付方式最多为100个字符"
        },
        allergy: {
          required: "请选择是否有药物过敏史"
        },
        allergyCheck: {
          equalToRadio: "请选择药物过敏史"
        },
        qitaallergyCheck: {
          equalToCheckbox: "请输入其他药物过敏史",
          maxlength: "其他药物过敏史最多为100个字符"
        },
        disease: {
          required: "请选择有无疾病"
        },
        diseaseCheckHid: {
          equalToRadio: "请选择疾病"
        },
        qitadiseaseCheck: {
          equalToCheckbox: "请输入其他疾病",
          maxlength: "其他疾病最多为100个字符"
        },
        operation: {
          required: "请选择有无做过手术"
        },
        operationName: {
          equalToRadio: "请输入手术名称",
          maxlength: "手术名称最多为100个字符"
        },
        trauma: {
          required: "请选择有无外伤"
        },
        traumaName: {
          equalToRadio: "请输入外伤名称",
          maxlength: "外伤名称最多为100个字符"
        },
        transfusion: {
          required: "请选择有无输血"
        },
        transfusionName: {
          equalToRadio: "请输入输血原因",
          maxlength: "输血原因最多为100个字符"
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
      console.log("保存健康信息orderId:" + orderId);
      wx.request({
        url: appInstance.globalData.serverUrl +'weixinSmall!saveJiaren', //仅为示例，并非真实的接口地址
        data: {
          formData: JSON.stringify(formData),
          orderId: orderId,
          vipMemberId: vipMemberId,
          sessionId: value
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          
          var query_clone = res.data[0];
          console.log("query_clone:" + res);  
          if (query_clone.flg == 1) {
            if (query_clone.to == 'toCode'){
                console.log("跳转code页面");
                wx.redirectTo({
                  url: '../code/code?orderId=' + orderId
                })
             }
            if (query_clone.to == 'toJiaren') {
              console.log("跳转code页面");
              var vipNemberHid = query_clone.vipMemberId;
              wx.redirectTo({
                url: '../add_jiaren/add_jiaren?orderId=' + orderId 
              })
            }
            
           
          } else {
            console.log("保存个人信息失败");
            wx.showToast({
              title: '保存失败',
              icon: 'loading',
              image: '../../images/close.png',
              duration: 2000
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
      title: '家人信息'
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