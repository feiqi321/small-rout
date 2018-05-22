// pages/goods_detail/goods_detail.js
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: '<div style="text-align:center;">《静夜思》· 李白<br />床前明月光，<br /></div>',
    goodsId:null,//商品id
    imgSrc:'http://xu-game.xubei.com/game/GTQaFr2DEw.jpg',
    goodDetail:{},
    'gwcbj':'/image/gwc.png',
    showDetail:true,
    showCard:false,
    showType:0,
    num:1,
    buyer:[
      {
        userName:'',
        creattime:'',
        sellNum:0
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
    wx.switchTab({
      url: '/pages/goodscard/goodscard'
    })
  },
  setShowDetailTrue(){
    var _this = this;
    wx.request({
      url: 'https://www.isxcxbackend1.cn//bmh_shop/order/detail/sellCount/' + _this.data.goodsId,
      method: 'GET',
      success: function (res) {
        if (res.data.success) {
          _this.setData({
            buyer : res.data.rows,
            showDetail: true
          })
        }
      }
    })
    /*this.setData({
      showDetail:true
    })*/
  },
  setShowDetailFalse() {
    var _this = this;
    wx.request({
      url: 'https://www.isxcxbackend1.cn//bmh_shop/order/detail/sellCount/' + _this.data.goodsId,
      method: 'GET',
      success: function (res) {
        if (res.data.success) {
          _this.setData({
            buyer: res.data.rows,
            showDetail: false
          })
        }
      }
    })
    /*this.setData({
      showDetail: false
    })*/
  },
  showCard(){
    this.setData({
      showCard:true,
      showType:1
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
  showBuyCard() {
    this.setData({
      showCard: true,
      showType: 2
    })
  },
  submitOrder(){
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
      return;
    }else{
      var data = this.data.goodDetail;
      data.productNum = this.data.num;
      data.productId=data.id;
      wx.request({
        url: 'https://www.isxcxbackend1.cn//bmh_shop/app/product//buy',
        method: 'POST',
        data: {
          "userId": wx.getStorageSync('userName'),
          "totalAmt": data.price,
          "buyProductDetailRequests": [data]
        },
        success: function (res) {
          if (res.data.success) {
            console.log(res.data.data)
            var id = res.data.data;
            wx.navigateTo({
              url: '/pages/orderPay/orderpay?id=' + id,
            })
          } else {
            wx.showToast({
              title: res.data.errorMsg,
              icon: 'fail',
              duration: 2000,
    
            })
          }
        }
      })
    }
    
  },
  submit(){
    const _this=this;
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
      return;
    }else{
      if (this.data.showType==1){
        var id = wx.getStorageSync('userName');
        wx.request({
          url: 'https://www.isxcxbackend1.cn/bmh_shop/shoppingCart/update',
          data: {
            userId: id,
            productId: this.data.goodsId,
            productNum: this.data.num
          },
          method: 'POST',
          success: function (res) {
            console.log(res);
            if (res.data.success) {
              _this.hideCard();
              wx.showToast({
                title: '加入购物车成功！',
                icon: 'success',
                duration: 2000
              });
            } else {
              wx.showToast({
                title: res.data.errorMsg,
                icon: 'fail',
                duration: 2000,

              })
            }
          }
        })
      }else if (this.data.showType ==2){
        _this.submitOrder();
      }

    }
    
  },
  query(cb){
    const _this=this;
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/product/info/detail/' + this.data.goodsId, //仅为示例，并非真实的接口地址
      success: function (res) {
        console.log(res)
        WxParse.wxParse('article', 'html', res.data.data.detail, _this, 5);
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