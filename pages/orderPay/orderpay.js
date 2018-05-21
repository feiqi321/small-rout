// pages/orderPay/orderpay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo:null,
    userID:null,
    addressId:0,
    total:null,
    address: {
      linkman: '',
      detail: '',
      tel: ''
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
      url: '/pages/address/address?orderId=' + this.data.orderNo,
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
        "totalAmt": this.data.total,
        "orderIds": this.data.orderNo
      },
      success: function (res) {
        console.log(res)
        if(res.data.success){
          wx.showToast({
            title: '购买成功',
            icon: 'success',
            duration: 2000,
            complete:function(){
              wx.navigateTo({
                url: '/pages/orderlist/orderlist',
              })
            }
          })
        }else{
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'fail',
            duration: 2000,
            // complete: function () {
            //   wx.navigateTo({
            //     url: '/pages/orderlist/orderlist',
            //   })
            // }
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
            listData: res.data.data.list,
            total:res.data.data.totalAmt
          })
        }
      }
    })
  },
  queryDefaultAddress(){
    var _this = this;
    var addressId;
    //https://www.isxcxbackend1.cn/bmh_shop/app/product/orderToBuy?orderIds=7
    if (!this.data.addressId){
      addressId=0
    }else{
      addressId = this.data.addressId
    }
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/address/info/default/' + this.data.userID  +'/' + addressId,
      success: function (res) {
        if (res.data.success) {
          _this.setData({
            address: res.data.data
          })
        }
      }
    })
  },
  onLoad: function (options) {
    console.info(options.id);
    this.setData({
      orderNo:options.id,
      userID: wx.getStorageSync('userName'),
      addressId: options.addressId
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