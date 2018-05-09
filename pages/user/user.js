//index.js
//获取应用实例
var flg;
const app = getApp()
var appInstance = getApp();
Page({
  data: {
    haslogin: false,
    phone: '',
    password: ''
  },
  // 获取输入手机号  
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码  
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  onLoad: function (options) {
    this.WxValidate = appInstance.wxValidate(
      {
        mobile: {
          required: true,
          tel: true,
        },
        password: {
          required: true,
          minlength: 6,
          maxlength: 20,
        }
      },
      {
        mobile: {
          required: '请输入手机号',
          tel: '请输入正确的手机号'
        },
        password: {
          required: '请输入密码',
          minlength: '密码至少为6位',
          maxlength: '密码至多为20位',
        }
      }
    )
  },
  // 登录  
  formSubmit: function (e) {
    var that=this;
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
      console.log("value:" + value);
      console.log("userName:" + e.detail.value.mobile);
      console.log("password:" + e.detail.value.password);
      
      wx.request({
        url: 'https://www.hems999.com/weixinSmall!weixinLogin', //仅为示例，并非真实的接口地址
        data: {
          "sessionId": value,
          "userName": e.detail.value.mobile,
          "password": e.detail.value.password
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var query_clone = res.data[0];
          console.log(query_clone);
          if (query_clone.flg == '0') {
            wx.showModal({
              content: query_clone.message,
              duration: 2000
            })
          } else {
            wx.setStorageSync('mobile', e.detail.value.mobile);  //存手机号
            //登陆成功跳转
            /*wx.showModal({
              content: query_clone.message,
              duration: 2000
            })*/
            wx.showToast({
              title: "登录成功",
              icon: 'success',
              duration: 2000
            })
            that.setData({
              haslogin: false,
              userName: e.detail.value.mobile
            })
            wx.setNavigationBarTitle({
              title: '会员中心'
            })
            /*wx.switchTab({
              url: '/pages/user/user'
            })*/
          }
        }
      });
    }
  },
  //退出
  quit: function () {
    var that = this;
    var sessionId = wx.getStorageSync('sessionId');
    wx.request({
      url: 'https://www.hems999.com/weixinSmall!exit',
      data: {
        sessionId: sessionId
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          haslogin: true
        })
        wx.setNavigationBarTitle({
          title: '登录'
        })
        wx.setStorageSync('mobile',"")
      }
    });
  },
  /**
  * 生命周期函数--监听页面卸载
  */
  /**
    * 生命周期函数--监听页面显示
    */
  onShow: function () {
    
    var sessionId = wx.getStorageSync("sessionId");
    var that=this;
    console.log("sessionId_transfer:" + sessionId);
    wx.request({
      url: 'https://www.hems999.com/weixinSmall!weixinOrderList', //仅为示例，并非真实的接口地址
      data: { sessionId: sessionId },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var query_clone = res.data[0];
        console.log("query_clone----" + query_clone.flg);
        //console.log(query_clone.basicUser.username);
        if (query_clone.flg==1){
          that.setData({
            userName: query_clone.basicUser.username
          });
          wx.setStorageSync('mobile', query_clone.basicUser.username);//存手机号
        }
        
        if (sessionId == "") {
          that.setData({ 
            haslogin: true
          })
          wx.setNavigationBarTitle({
            title: '登录'
          })
        } else if (query_clone.flg == 0){
          that.setData({
            haslogin: true
          })
          wx.setNavigationBarTitle({
            title: '登录'
          })
        }else{
          that.setData({
            haslogin: false
          })
          wx.setNavigationBarTitle({
            title: '会员中心'
          })
        }
        /*that.setData({
          basicUser: query_clone.basicUser
        })*/
        
      }
    });
  },

  onUnload: function () {
  }
})
