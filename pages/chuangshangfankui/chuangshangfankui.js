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

  uploadVideo: function (e) {
    var pics = this.data.add_video;
    var sosId = wx.getStorageSync("sosId");
    if (sosId == null || sosId == '') {
      wx.showToast({
        title: "没有SOS报警记录",
        icon: 'none',
        duration: 2000
      })
    } else {
      //调用上传图片的具体实现
      this.uploadimg({
        url: 'https://teach.hems999.com/weixinSmall!uploadSosVideo',
        path: pics,//这里是选取的图片的地址数组
        id: sosId,
      });
    }
  },


  upload: function (e) {
    var pics = this.data.add_img;
    var sosId = wx.getStorageSync("sosId");
    if (sosId == null || sosId == ''){
      wx.showToast({
        title: "没有SOS报警记录",
        icon: 'none',
        duration: 2000
      })
    } else{
      //调用上传图片的具体实现
      this.uploadimg({
        url: 'https://teach.hems999.com/weixinSmall!uploadSosPhoto',
        path: pics,//这里是选取的图片的地址数组
        id: sosId,
      });
    }
  },

  uploadimg: function (data) {
    console.log("上传图片开始");
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',
      formData: {
        //此处可以传自定义参数……
        sosid:data.id,
        num:i
      },
      header: {
        "Content-Type": "multipart/form-data",
        //"sessionId": getApp().globalData.sessionId,
      },
      success: (resp) => {
        success++;
      },
      fail: (res) => {
        fail++;
      },
      complete: () => {
        i++;
        if (i == data.path.length) {   //当图片传完时，停止调用
          
          wx.showLoading({
            title: '上传成功',
          })

          setTimeout(function () {
            wx.hideLoading()
          }, 2000)

          that.setData({
            tempFilePaths: []
          })
        } else {//若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    });
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