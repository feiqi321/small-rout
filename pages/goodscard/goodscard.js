// pages/goodscard/goodscard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allChecked: true,
    total:0,
    listData: [
      {
        title: '[BT租号]绝地求生steam账号',
        des: '满飞满螃各种圣衣，光环！勿打生存，不然扣押金！',
        total: '1990',
        num: 1,
        price:25,
        id: '001',
        checked: true
      },
      {
        title: '[BT租号]绝地求生steam账号',
        des: '满飞满螃各种圣衣，光环！勿打生存，不然扣押金！',
        total: '1990',
        num: 3,
        price: 25,
        id: '003',
        checked: true
      },
      {
        title: '[BT租号]绝地求生steam账号',
        des: '满飞满螃各种圣衣，光环！勿打生存，不然扣押金！',
        total: '1990',
        num: 1,
        id: '002',
        price: 25,
        checked: true
      },
      {
        title: '[BT租号]绝地求生steam账号',
        des: '满飞满螃各种圣衣，光环！勿打生存，不然扣押金！',
        total: '1990',
        num: 5,
        id: '005',
        price: 25,
        checked: true
      },
      {
        title: '[BT租号]绝地求生steam账号',
        des: '满飞满螃各种圣衣，光环！勿打生存，不然扣押金！',
        total: '1990',
        num: 4,
        id: '006',
        price: 25,
        checked: true
      }
    ]

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
  computTotal(){
    var list = this.data.listData;
    var total=0;
    list.forEach(function(item){
      if (item.checked){
        total += item.price * item.num;
      }
    });
    this.setData({
      total: total
    });
  },
  delete(e){
    var index = parseInt(e.currentTarget.dataset.item);
    var list = this.data.listData;
    list.splice(index,1);
    this.setData({
      listData:list
    });
    this.computTotal();
  },
  gotolist(){
    wx.switchTab({
      url: '/pages/list/list'
    })
  },
  // 方法end
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.computTotal();
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