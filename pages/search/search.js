// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      {
        img: 'http://mmbiz.qpic.cn/mmbiz_jpg/zKZ7UQnGpOFIQrI4tNrlbNLdK7TLicwYCColZoENm2WF2LEhGngkL7OG4vicV47cYKYCgLTau2VZNbX6ic46oEVaw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
        url: 'http://www.baidu.com',
        price: 100,
        title: '儿童山轮车'
      },
      {
        img: 'http://mmbiz.qpic.cn/mmbiz_jpg/zKZ7UQnGpOFIQrI4tNrlbNLdK7TLicwYCColZoENm2WF2LEhGngkL7OG4vicV47cYKYCgLTau2VZNbX6ic46oEVaw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
        url: 'http://www.baidu.com',
        price: 90,
        title: '儿童山轮车'
      },
      {
        img: 'http://mmbiz.qpic.cn/mmbiz_jpg/zKZ7UQnGpOFIQrI4tNrlbNLdK7TLicwYCColZoENm2WF2LEhGngkL7OG4vicV47cYKYCgLTau2VZNbX6ic46oEVaw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
        url: 'http://www.baidu.com',
        price: 100,
        title: '儿童山轮车'
      }
    ]
  },
  
  search(e) {
    wx.showToast({ title: e.detail.value })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})