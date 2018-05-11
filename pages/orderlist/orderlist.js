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
      {
        orderNo: '72718931738',
        imgUrl: '//img10.360buyimg.com/N6/s60x60_jfs/t394/330/395080578/53572/ae74ec1e/541a97fdN6b408ceb.jpg',
        shopTitle: '乐扣乐扣（lock&lock）缤纷保温杯 LHC4020G（330ml）绿色',
        num: 2,
        total: '73.00',
        shopNum: 1,
        orderStatus: 0,
        orderStatusText: '待支付'
      },
      {
        orderNo: '72718931738',
        imgUrl: '//img10.360buyimg.com/N6/s60x60_jfs/t394/330/395080578/53572/ae74ec1e/541a97fdN6b408ceb.jpg',
        shopTitle: '乐扣乐扣（lock&lock）缤纷保温杯 LHC4020G（330ml）绿色',
        num: '2',
        total: '73.00',
        shopNum: 1,
        orderStatus: 1,
        orderStatusText: '已发货'
      },
      {
        orderNo: '72718931738',
        imgUrl: '//img10.360buyimg.com/N6/s60x60_jfs/t394/330/395080578/53572/ae74ec1e/541a97fdN6b408ceb.jpg',
        shopTitle: '乐扣乐扣（lock&lock）缤纷保温杯 LHC4020G（330ml）绿色',
        num: 2,
        total: '73.00',
        shopNum: 1,
        orderStatus: 2,
        orderStatusText: '已完成'
      }
    ]
  },
  changeTab(e){
    const index = parseInt(e.currentTarget.dataset.key);
    this.setData({
      navIndex: index
    });
  },
  gotocom(e){
    const id = parseInt(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/comment/comment'
    })
  },
  gotoPay(e){
    const id = parseInt(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/orderPay/orderpay'
    })
  },
  pl() {
    
  },
  querylist(){
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
        console.log(res)
         
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