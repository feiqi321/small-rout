// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.query();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  query(cb) {
    const _this = this;
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/shopInfo/table',
      data:{
        status:4,
        page:1,
        rows:100
      },
      success: function (res) {
        res=res.data;
        if(res.code===0){
          _this.setData({
            dataList:res.rows
          })
        }
        console.log(_this.data.dataList)
        cb && cb();
      }
    })
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