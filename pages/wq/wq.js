// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    context: '',
  },
  listenerTitleInput: function (e) {
    
    this.data.title = e.detail.value;

  },
  listenerContextInput: function (e) {
    this.data.context = e.detail.value;

  },
  addImg() {
    var that = this;

    wx.chooseImage({
      count: 3,  //最多可以选择的图片总数  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var uploadImgCount = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          wx.uploadFile({
            url: util.getClientSetting().domainName + '/home/uploadfilenew',
            filePath: tempFilePaths[i],
            name: 'uploadfile_ant',
            formData: {
              'imgIndex': i
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              uploadImgCount++;
              var data = JSON.parse(res.data);
              //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  
              var productInfo = that.data.productInfo;
              if (productInfo.bannerInfo == null) {
                productInfo.bannerInfo = [];
              }
              productInfo.bannerInfo.push({
                "catalog": data.Catalog,
                "fileName": data.FileName,
                "url": data.Url
              });
              that.setData({
                productInfo: productInfo
              });

              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
        }
      }
    });
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
  submit() {
  
    if (this.data.title == "") {
      wx.showToast({
        title: '请填写申诉标题',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (this.data.context == "") {
      wx.showToast({
        title: '请填写申诉内容',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    var userId = wx.getStorageSync("userName");
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/appeal/update',
      data: {
        userId: userId,
        title: this.data.title,
        context: this.data.context,
        status:0
      },
      method: 'POST',
      success: function (res) {
        
        if (!res.data.success) {
          wx.showToast({
            title: res.data.errorMsg || '网络异常！',
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '申诉请求已发送',
            icon: 'none',
            duration: 2000
          });
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }, 800)
          
        }
      }

    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})