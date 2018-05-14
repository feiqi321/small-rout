// pages/orderlist/orderlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex:0,
    userId:null,
    loading:false,
    listData: [
    ]
  },
  changeTab(e){
    const index = parseInt(e.currentTarget.dataset.key);
    this.setData({
      navIndex: index
    });
    this.querylist()
  },
  gotocom(e){
    const id = parseInt(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + id
    })
  },
  gotoPay(e){
    const id = parseInt(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/orderPay/orderpay?id=' + id
    })
  },
  pl() {
    
  },
  querylist(cb){
    var _this=this;
    var status = _this.data.navIndex-1;
    if(status<0){
      status=null;
    }
    wx.request({
      url: 'https://www.isxcxbackend1.cn//bmh_shop/order/info/listOrder', //仅为示例，并非真实的接口地址
      data: {
        userId: _this.data.userId,
        status: status
      },
      success: function (res) {
        console.log(res);
        console.log(res.data.success)
        if (res.data.success){
          _this.setData({
            listData:res.data.rows
          });

        }
        cb&&cb()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.getStorageSync('userName')) {
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 2000,
        complete: function () {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      });
    }else{
      var userId = wx.getStorageSync('userName');
      this.setData({
        userId:userId
      })
      this.querylist();
    }
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
    that.querylist(function () {
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