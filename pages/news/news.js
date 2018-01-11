Page({

  /**
   * 页面的初始数据
   */
  data: {
    new_list: "",
    pageNo:"",
    pageTotal:"",
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false
  },
  /**下一页 */
  loadNext(e) {
    if (this.data.new_list.length === 0) return
    var that = this
 
    console.log("下一页" + (Number(this.data.pageNo) + 1));
    wx.request({
      url: 'https://www.hems999.com/list_weixin?pageNo=' + (Number(this.data.pageNo) + 1),
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({

          new_list: res.data.content,
          pageNo: res.data.pageNo,
          pageTotal: res.data.pageTotal
        })
      }
    })
  },
  /**上一页 */
  loadPre(e) {
    if (this.data.new_list.length === 0) return
    var that = this
 
    console.log("下一页" + (Number(this.data.pageNo) - 1));
    wx.request({
      url: 'https://www.hems999.com/list_weixin?pageNo=' + (Number(this.data.pageNo) - 1),
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({

          new_list: res.data.content,
          pageNo: res.data.pageNo,
          pageTotal: res.data.pageTotal
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('newsList-onLoad')
    var that = this;
    wx.request({
      url: 'https://www.hems999.com/list_weixin?pageNo=' + options.pageNo, //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/json;charset=utf-8',
        'CharacterEncoding':"UTF-8"
      },
      success: function (res) {
        that.setData({
          new_list: res.data.content,
          pageNo: res.data.pageNo,
          pageTotal: res.data.pageTotal
        })
        console.log(res.data.pageNo   );
        console.log(res.data.pageTotal);
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
    wx.switchTab({
      url: '/pages/about/list'
    })  
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