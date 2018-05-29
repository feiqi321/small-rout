// pages/filter/filter.js
Page({
  data: {
    filterData: [],
    filterId:'',
    currentList: [],
    currentIndex:0
  },
  queryFilterList(cb) {
    var _this = this;
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop//product/type/showList/0',
      success: function (res) {
        if (res.data.success) {
          _this.setData({
            filterData: res.data.rows,
            currentList: res.data.rows[0].array
          });
          cb && cb();
        }

      }
    })
  },
  setCurrentList(){
    this.setData({
      currentList: this.data.filterData[this.data.currentIndex].array
    })
  },
  changeIndex(e){
    var index=e.target.dataset.index;
    this.setData({
      currentIndex:index
    });
    this.setCurrentList();
  },
  setCurrentFilter(e){
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '/pages/newList/newList?id=' + id,
    })
  },
  onLoad: function (options) {
    console.log(111)
    this.queryFilterList();
  },
  onPullDownRefresh: function () {
    that.queryFilterList(function () {
      wx.stopPullDownRefresh();
    });
  }
})