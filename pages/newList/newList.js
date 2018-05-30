// pages/orderlist/orderlist.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 0,
    pageIndex: 1,
    
    url: {
      0: 'https://www.isxcxbackend1.cn//bmh_shop/product/info/listUnReduce',
      1: 'https://www.isxcxbackend1.cn/bmh_shop/app/product/listReduce'
    },
    isEnd: false,
    listData: [],
    filterId:null,
    
  },
  
  changeTab(e) {
    const index = parseInt(e.currentTarget.dataset.key);
    console.info(index);
    this.setData({
      navIndex: index,
      isEnd: false,
      pageIndex: 1
    });
    this.queryList();
<<<<<<< Updated upstream
   
=======
    this.queryFilterList();
  },
  setCurrentFilter(e){
    var id = e.target.dataset.id;
    this.setData({
      filterId:id,
      showFilter:false
    });
    this.queryList();
>>>>>>> Stashed changes
  },
  
  queryList(cb) {
    var _this = this;
    wx.request({
      url: _this.data.url[_this.data.navIndex], //仅为示例，并非真实的接口地址
      data: {
        type: _this.data.filterId,
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

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      filterId: options.id
    });
    console.log(this.data.filterId)
    var type = app.globalData.selectCondition;
    if (type) {
      app.globalData.selectCondition = null;
      this.setData({
        navIndex: 1
      });
    }
    that.queryList();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  
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
  onReachBottom: function () {
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