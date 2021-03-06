// pages/goodscard/goodscard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allChecked: false,
    total: 0,
    listData: []

  },
  // 方法
  checkTap() {
    var _this = this;
    var list = this.data.listData;
    list.forEach(function (item) {
      item.checked = !_this.data.allChecked;
    });
    _this.setData({
      allChecked: !_this.data.allChecked,
      listData: list
    });
    this.computTotal();
  },
  checkout(e) {
    var index = parseInt(e.currentTarget.dataset.item);
    var list = this.data.listData;
    list[index].checked = !list[index].checked;
    this.setData({
      listData: list
    });
    this.isAll();
  },
  isAll() {
    //allChecked
    var checked = this.data.listData.every(function (item) {
      return item.checked;
    });
    this.setData({
      allChecked: checked
    });
    this.computTotal();
  },
  computTotal() {
    var list = this.data.listData;
    var total = 0;
    list.forEach(function (item) {
      if (item.checked) {
        console.info(item.price + "**" + item.productNum)
        total += item.price * item.productNum;
      }
    });
    this.setData({
      total: total
    });
  },
  submitOrder(e) {
    var that = this;
    var data=that.data.listData;
    data=data.filter(function(item){
      return item.checked
    });
    if(data.length<1){
      wx.showToast({
        title: '选择的商品不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.request({
      url: 'https://www.isxcxbackend1.cn//bmh_shop/app/product//buy',
      method: 'POST',
      data: {
        "userId": wx.getStorageSync('userName'),
        "totalAmt": this.data.total,
        "buyProductDetailRequests": data
      },
      success: function (res) {
        if (res.data.success){
          console.log(res.data.data)
          var id=res.data.data;
          wx.navigateTo({
            url: '/pages/orderPay/orderpay?id=' + id,
          })
        }
      }
    })
  },
  delete(e) {
    var index = parseInt(e.currentTarget.dataset.item);
    var list = this.data.listData;
    var id = list[index].id;
    list.splice(index, 1);
    this.setData({
      listData: list
    });
    this.computTotal();
    this.queryDelete(id);
  },
  queryDelete(id) {
    var that = this;
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/shoppingCart/delete/' + id,
      method: 'DELETE',
      success: function (res) {
        console.log(res);
      }
    })
  },
  gotolist() {
    wx.navigateTo({
      url: '/pages/newList/newList'
    })
  },
  query(cb) {
    var that = this;
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/shoppingCart/list?userId=' + wx.getStorageSync('userName'),
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          listData: res.data.rows
        });
        that.computTotal();
        cb && cb();
      }
    })
  },
  // 方法end
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
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      });
    } else {
      this.query();
    }
  },
  onPullDownRefresh() {
    var that = this;
    that.query(function () {
      wx.stopPullDownRefresh();
    });

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