var flag = "true";
var a_more;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    new_list:"",
    slider: [
      { picUrl: '../../images/banner01.jpg' },
      { picUrl: '../../images/banner02.jpg' },
      { picUrl: '../../images/banner03.jpg' },
      { picUrl: '../../images/banner04.jpg' },
      { picUrl: '../../images/banner05.jpg' }
    ],
    swiperCurrent: 0,
    news: {
      title: [
        '覆盖山东全省覆盖山东全省覆盖山东全省',
        '专业的医疗设备',
        '快速到达现场'
      ],
      descs: [
        '保障山东全省高速公路安全保障山东全省障山路安全保障山东全路安全保障山东全东全省高高速公路安全',
        '直升机配备专业的急救医疗设备',
        '30-60分钟到达现场'
      ],
      imgUrls: [
        '../../images/index01.png',
        '../../images/index02.png',
        '../../images/index03.png'
      ]
      
    },
    a_more:"more"
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  moreClick:function(){
    if(flag){
      a_more ="more_active";
      flag=false;
    }else{
      a_more = "more";
      flag = true;
    }
    this.setData({ a_more});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('taobao-onLoad')
    var that = this;
    wx.request({
      url: 'https://teach.hems999.com/index_weixin', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("从app.js请求服务器test.php获取数据");
        var query_clone = res.data;
         console.log(query_clone);
        that.setData({
          new_list: query_clone,
        });
        console.log(res.data);
      }
    });
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
      title: '九九九空中救护'
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