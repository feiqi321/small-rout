// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[
      
    ]
  },
  chooseAddress(e){
    if (this.data.orderId){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/orderPay/orderpay?id=' + this.data.orderId + '&addressId=' + id,
      })
    }
  },
  addEdit(e){
    var id = e.currentTarget.dataset.id;
    if(id){
      wx.navigateTo({
        url: '/pages/addedit/addedit?id=' + id,
      })
    }else{
      wx.navigateTo({
        url: '/pages/addedit/addedit',
      })
    }
    
  },
  query(cb){
    var that=this;
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/address/info/myAddressList?userId=' + that.data.userId,
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          listData: res.data.rows
        });
        cb&&cb()
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      that.setData({
        userId: wx.getStorageSync("userName"),
        orderId: options.orderId||null
      });
      that.query();
      
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
    var that = this;
    that.query(function () {
      wx.stopPullDownRefresh();
    });
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