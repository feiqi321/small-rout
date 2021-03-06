//获取应用实例
var app = getApp();
Page({
  data: {
    nickName:'',
    avatarUrl:'http://img.isxcxbackend1.cn/head.jpg',
    userInfo: {
      //avatarUrl:"",
      //nickName:"",
      //amt:0
    },
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [{
      icon: '../../image/iconfont-dingdan.png',
      text: '我的订单',
      path: '/pages/orderlist/orderlist'
    }, 
     {
      icon: '../../image/iconfont-shouhuodizhi.png',
      text: '收货地址管理',
      path: '/pages/address/address'
      }, {
        icon: '../../image/iconfont-kefu.png',
        text: '充值记录',
        path: '/pages/czjl/czjl'
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
    // if (!wx.getStorageSync('userName')){
    //   wx.navigateTo({
    //     url: '/pages/login/login'
    //   })
    // }
    // console.log(wx.getStorageSync('tel'))
    
    
   // var userInfo = {};
   // userInfo.nickName = wx.getStorageSync('tel');
   // userInfo.amt = wx.getStorageSync('amt');
    //userInfo.avatarUrl = "http://p6wd1cjvv.bkt.clouddn.com/head.jpg";
   // that.setData({
   //   userInfo: userInfo
   // })
    //that.data.avatarUrl = "http://p6wd1cjvv.bkt.clouddn.com/head.jpg"
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
       
      })
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  onShow(){
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
    }else{
      this.setData({
        nickName: wx.getStorageSync('tel')
      })
    }
  },
  
})
