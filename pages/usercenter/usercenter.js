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
    }, 
    //{
    //  icon: '../../image/iconfont-card.png',
    //  text: '我的福利',
    //  path: '/pages/store_list/store_list'
    //},
     {
      icon: '../../image/iconfont-icontuan.png',
      text: '购物车',
      path: '/pages/goodscard/goodscard'
    }, {
      icon: '../../image/iconfont-shouhuodizhi.png',
      text: '收货地址管理',
      path: '/pages/address/address'
    }, {
      icon: '../../image/iconfont-kefu.png',
      text: '商家入驻',
      path: '/pages/sjrz/sjrz'
    }, {
      icon: '../../image/iconfont-help.png',
      text: '联系我们',
      path: '/pages/contact/contact'
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
      wx.switchTab({
        url: '/pages/login/login'
      })
    }
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onUnload: function () {
    console.log(111)
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})
