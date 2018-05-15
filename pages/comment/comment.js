// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:null,
    orderNo: null,
    imgUrl: null,
    title: null,
    detail: null
  },
  listenertitleInput: function (e) {
    this.data.title = e.detail.value;
  },
  listenerdetailInput: function (e) {
    this.data.detail = e.detail.value;
  },
  submit() {
    console.log(this.data.imgUrl)
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/discuss/update',
      method: 'POST',
      data: {
        userId: this.data.userId,
        title: this.data.title,
        url: this.data.imgUrl,
        context: this.data.detail
      },
      success: function (res) {
        if (res.data.success){
          wx.showToast({
            title: '评论成功',
            icon: 'none',
            duration: 2000
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/orderlist/orderlist'
            })
          }, 800)
        }
        
      }
    })

    },
  addImg() {
    var that = this;

    wx.chooseImage({
      count: 1,  //最多可以选择的图片总数  
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
            //url: 'http://good-api.xubei.com/goods-api/arbitration/upTemp',
            url:'https://www.isxcxbackend1.cn/bmh_shop/product/info/upload',
            filePath: tempFilePaths[i],
            //name: 'uploadfile_ant',
            name:'file',
            formData: {
              'imgIndex': i
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              console.log(res)
              uploadImgCount++;
              // var data = JSON.parse(res.data);
              // //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  
              // var productInfo = that.data.productInfo;
              // if (productInfo.bannerInfo == null) {
              //   productInfo.bannerInfo = [];
              // }
              // productInfo.bannerInfo.push({
              //   "catalog": data.Catalog,
              //   "fileName": data.FileName,
              //   "url": data.Url
              // });
              //var result = JSON.parse(res.data);
              //if (result.code === "1") {
              var result = JSON.parse(res.data);
              if (result.success){
                that.setData({
                  //imgUrl: result.result.image_path
                  imgUrl: result.data
                });
                wx.showToast({
                  title: '上传图片成功',
                  icon: 'none',
                  duration: 2000
                });
              }


              // //如果是最后一张,则隐藏等待中  
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
    this.setData({
      orderNo: options.id,
      userId: wx.getStorageSync('userName')
    });
    console.log(this.data.orderNo)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})