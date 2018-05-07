//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    //motto: 'Hello World',
    //userInfo: {},
    lunbo_src: [
      'https://img02.wzhouhui.net/optm/ad/2017/03/08/orig/d51c19b84bbc45a8d15b460fcd6ae99768527638.jpg',
      'https://img02.wzhouhui.net/optm/ad/2017/03/08/orig/e22542db46cefea5dfb51f7c7ba8d3817824e65c.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    cate_src: [
      {
        text: '注册登录',
        picture: '../../image/3@2x.png',
        path:'/pages/login/login'
      },
      {

        text: '产品中心',
        picture: '../../image/15@2x.png',
        path: '/pages/list/list'
      },
      {

        text: '新品推荐',
        picture: '../../image/4@2x.png',
        path: '/pages/list/list'
      },
      {

        text: '特价专区',
        picture: '../../image/11@2x.png',
        path: '/pages/list/list'
      },
      {

        text: '代币交易',
        picture: '../../image/2@2x.png',
        path: '/pages/list/list'
      },
      {

        text: '代币充值',
        picture: '../../image/@2x.png',
      },
      {

        text: '会员福利',
        picture: '../../image/7@2x.png',
      }, {

        text: '会员分享',
        picture: '../../image/31@2x.png',
      },
      {

        text: '交易纠纷处理',
        picture: '../../image/8@2x.png',
      },
      {

        text: '商家入驻',
        picture: '../../image/12@2x.png',
      }, {

        text: '商家介绍',
        picture: '../../image/17@2x.png',
      },
      {

        text: '联系我们',
        picture: '../../image/16@2x.png',
      }
    ],
    listData: [
      {
        img: 'http://p6wd1cjvv.bkt.clouddn.com/tempfenxiang.png',
        url: 'http://www.baidu.com',
        title: '儿童山轮车',
        share:'范彬彬',
        num:123
      },
      {
        img: 'http://p6wd1cjvv.bkt.clouddn.com/tempfenxiang.png',
        url: 'http://www.baidu.com',
        title: '儿童山轮车',
        share: '范彬彬',
        num: 123
      },
      {
        img: 'http://p6wd1cjvv.bkt.clouddn.com/tempfenxiang.png',
        url: 'http://www.baidu.com',
        title: '儿童山轮车',
        share: '范彬彬',
        num: 123
      },
      {
        img: 'http://p6wd1cjvv.bkt.clouddn.com/tempfenxiang.png',
        url: 'http://www.baidu.com',
        title: '儿童山轮车',
        share: '范彬彬',
        num: 1223
      },
      {
        img: 'http://p6wd1cjvv.bkt.clouddn.com/tempfenxiang.png',
        url: 'http://www.baidu.com',
        title: '儿童山轮车',
        share: '范彬彬',
        num: 1223
      },
      {
        img: 'http://p6wd1cjvv.bkt.clouddn.com/tempfenxiang.png',
        url: 'http://www.baidu.com',
        title: '儿童山轮车',
        share: '范彬彬',
        num: 1223
      }
    ]

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  onLoad: function () {
    var that = this;
      wx.request({
        url: 'https://www.isxcxbackend1.cn/bmh_shop/discuss/firstView',
        method: 'GET',
        success:function(res) {
          that.setData({
            listData: res.data.rows
          })
        }

      })
  },

})




