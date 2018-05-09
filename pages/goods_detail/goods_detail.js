// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId:null,//商品id
    imgSrc:'http://xu-game.xubei.com/game/GTQaFr2DEw.jpg',
    goodDetail:{},
    'gwcbj':'/image/gwc.png',
    showDetail:true,
    showCard:false,
    num:1,
    buyer:[
      {
        buyName:'张三',
        time:'2017-09-25',
        num:1
      },
      {
        buyName: '张三',
        time: '2017-09-25',
        num: 2
      },
      {
        buyName: '张三',
        time: '2017-09-25',
        num: 3
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    _this.setData({
      goodsId:options.id
    });
    _this.query();
  },
  gotoCard(){
    console.log(111)
    wx.navigateTo({
      url: '/pages/goodscard/goodscard'
    })
  },
  setShowDetailTrue(){
    this.setData({
      showDetail:true
    })
  },
  setShowDetailFalse() {
    this.setData({
      showDetail: false
    })
  },
  showCard(){
    console.log(121)
    this.setData({
      showCard:true
    })
  },
  hideCard(){
    this.setData({
      showCard: false
    })
  },
  addCardNum(){
    this.setData({
      num: this.data.num+1
    })
  },
  reduceCardNum() {
    this.setData({
      num: this.data.num - 1 > 1 ? this.data.num-1:1
    });
  },
  submit(){
    console.log(this.data.num);
    this.hideCard();
  },
  query(cb){
    const _this=this;
    wx.request({
      url: 'http://yapi.demo.qunar.com/mock/6878/bmh_shop/product/info/' + this.data.goodsId, //仅为示例，并非真实的接口地址
      success: function (res) {
        console.log(res);
        _this.setData({
          goodDetail: res.data.data
        })
        cb && cb();
      }
    })
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
    that.query(function () {
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