// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[
      
    ]
  },
  addEdit(e){
    wx.navigateTo({
      url: '/pages/addedit/addedit',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var userId = wx.getStorageSync("userName")
      console.info(userId);
      wx.request({
        url: 'https://www.isxcxbackend1.cn/bmh_shop/address/info/myAddressList?userId=' + userId,
        method: 'GET',
        success: function (res) {
          that.setData({
            listData: res.data.rows
          })
        }

      })
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