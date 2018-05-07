// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[
      {
        id:1,
        name:'朱先生',
        detail:'光谷大道高新五路当代国际城20栋1单元301',
        phone:'15927216320'
      },
      {
        id: 2,
        name: '朱先生1',
        detail: '光谷大道高新五路当代国际城20栋1单元301',
        phone: '15927216320'
      },
      {
        id: 3,
        name: '朱先生2',
        detail: '光谷大道高新五路当代国际城20栋1单元301',
        phone: '15927216320'
      },
      {
        id: 4,
        name: '朱先生3',
        detail: '光谷大道高新五路当代国际城20栋1单元301',
        phone: '15927216320'
      }
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