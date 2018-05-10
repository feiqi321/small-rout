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
      }
    ]
  },
  
  queryList(product_name) {
    var _this = this;
    wx.request({
      url: 'https://www.isxcxbackend1.cn//bmh_shop/product/info/table', //仅为示例，并非真实的接口地址
      data: {
        product_name: product_name,
        page: _this.data.pageIndex,
        rows: 10
      },
      // header: {
      //   'content-type': 'application/json' // 默认值
      // },
      success: function (res) {
        if (!res.data.rows || res.data.rows.length < 10) {
          _this.setData({
            isEnd: true
          });
        } else {
          _this.setData({
            isEnd: false
          });
        }
        var data = _this.data.pageIndex === 1 ? res.data.rows : _this.data.listData.concat(res.data.rows);
        _this.setData({
          listData: data
        });
        cb && cb();
      }
    })
  },

  search(e) {
    var product_name = e.detail.value;
    var that = this;
    that.queryList(product_name);
    //wx.showToast({ title: e.detail.value })
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
  onPullDownRefresh() {
    var that = this;
    that.setData({
      pageIndex: 1
    });
    that.queryList(function () {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom(e) {
    this.setData({
      pageIndex: this.data.pageIndex + 1
    });
    if (!this.data.isEnd) {
      this.queryList();
    } else {
      wx.showToast({
        title: '没有更多数据了！',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})