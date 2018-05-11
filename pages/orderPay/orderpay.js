// pages/orderPay/orderpay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo:null,
    userID:null,
    address: {
      name: '朱文诚',
      detail: '湖北省武汉市高新五路长航社区',
      phone: '15927216320'
    },
    listData: [
      // {
      //   title: '[BT租号]绝地求生steam账号',
      //   des: '满飞满螃各种圣衣，光环！勿打生存，不然扣押金！',
      //   total: '1990',
      //   num: 1,
      //   price: 25,
      //   id: '001'
      // }
    ]
  },
  changeAddress(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  submit(){
    var _this = this;
    //https://www.isxcxbackend1.cn/bmh_shop/app/product/orderToBuy?orderIds=7
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/app/product//payment',
      method:'POST',
      data:{
        "userId": this.data.userID,
        "totalAmt": "500",
        "orderIds": this.data.orderNo
      },
      success: function (res) {
        if (res.data.success) {
          _this.setData({
            listData: res.data.rows
          })
        }
      }
    })
  },
  queryShopList(){
    var _this=this;
    //https://www.isxcxbackend1.cn/bmh_shop/app/product/orderToBuy?orderIds=7
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/app/product/orderToBuy?orderIds=' + this.data.orderNo,
      success: function (res) {
        if (res.data.success) {
          _this.setData({
            listData:res.data.rows
          })
        }
      }
    })
  },
  queryDefaultAddress(){
    var _this = this;
    //https://www.isxcxbackend1.cn/bmh_shop/app/product/orderToBuy?orderIds=7
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/address/info/default/' + this.data.userID,
      success: function (res) {
        if (res.data.success) {
          console.log(res)
          // _this.setData({
          //   listData: res.data.rows
          // })
        }
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      orderNo:options.id,
      userID: wx.getStorageSync('userName')
    });
    this.queryShopList();
    this.queryDefaultAddress();
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