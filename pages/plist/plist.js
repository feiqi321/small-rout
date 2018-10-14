// 字体tabtab切换
Page({
  data: {
    pageIndex: 1,
    filterId: null,
    typeName:'',
    isEnd: false,
    listData: []
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
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
  queryList(cb) {
    var _this = this;
    wx.request({
      url: 'https://www.isxcxbackend1.cn//bmh_shop/product/info/listUnReduce', //仅为示例
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
        }else{
          _this.setData({
            isEnd: false
          });
        }
        var data = _this.data.pageIndex === 1 ? res.data.rows : _this.data.listData.concat(res.data.rows);
        _this.setData({
          typeName: res.data.data,
          listData: data
        });
        cb && cb();
      }
    })
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
  onLoad: function (options) {
    var that = this;
    var that = this;
    this.setData({
      filterId: options.id
    });
    that.queryList();
  },

})