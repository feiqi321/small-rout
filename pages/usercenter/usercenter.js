//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [{
      icon: '../../image/iconfont-dingdan.png',
      text: '我的订单',
      path: '/pages/orderlist/orderlist'
    }, {
      icon: '../../image/iconfont-card.png',
      text: '我的代金券',
    }, {
      icon: '../../image/iconfont-icontuan.png',
      text: '购物车',
      path:'/pages/goodscard/goodscard'
    }, {
      icon: '../../image/iconfont-shouhuodizhi.png',
      text: '收货地址管理',
      path:'/pages/address/address'
    }, {
      icon: '../../image/iconfont-kefu.png',
      text: '商家入驻'
    }, {
      icon: '../../image/iconfont-help.png',
      text: '关于我们'
    }]
  },
  gotoUrl(e){
    const index=e.currentTarget.dataset.index;
    if(this.data.userListInfo[index].path){
      wx.navigateTo({
        url: this.data.userListInfo[index].path
      })
    }
    
  },
  onLoad: function () {
    var that = this
    if (!wx.getStorageSync('userName')){
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
