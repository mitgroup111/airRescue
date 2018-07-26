// pages/chuangshangfankui/chuangshangfankui.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add_img: [],
    add_video: [],
  },
  //添加图片
  addImage: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        //console.log(res.tempFilePath)
        var src = res.tempFilePaths;
        var aa = that.data.add_img.concat(src)
        console.log(aa)
        that.setData({
          add_img: aa
        })
      },
    })
  },
  //删除图片
  delete_image: function (e) {
    var num = e.currentTarget.dataset.num;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          that.data.add_img.splice(num, 1)
          that.setData({
            add_img: that.data.add_img
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //预览图片
  preview_img: function (e) {
    var cur_num = e.currentTarget.dataset.num;
    var img_list = this.data.add_img
    wx.previewImage({
      current: img_list[cur_num],
      urls: this.data.add_img
    })
  },
  //添加视频
  addVideo: function () {
    console.log(1);
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        var src = res.tempFilePath;
        var aa = that.data.add_video.concat(src)
        console.log(aa)
        that.setData({
          add_video: aa
        })
        
      }
    })
  },
  //删除视频
  delete_video: function (e) {
    console.log(1);
    var num = e.currentTarget.dataset.num;
    
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          that.data.add_video.splice(num, 1)
          that.setData({
            add_video: that.data.add_video
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
      title: '创伤反馈'
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