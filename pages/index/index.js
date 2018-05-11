//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    //motto: 'Hello World',
    //userInfo: {},
    lunbo_src: [
      'http://p6wd1cjvv.bkt.clouddn.com/banner1.jpg',
      'http://p6wd1cjvv.bkt.clouddn.com/banner2.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    cate_src: [
      {
        text: '注册登录',
        picture: '../../image/3@2x.png',
        path: '/pages/usercenter/usercenter',
        urlType: 'tab'
      },
      {

        text: '产品中心',
        picture: '../../image/15@2x.png',
        path: '/pages/list/list',
        urlType: 'tab'
      },
      {

        text: '新品推荐',
        picture: '../../image/4@2x.png',
        path: '/pages/xptj/xptj'
      },
      {

        text: '特价专区',
        picture: '../../image/11@2x.png',
        path: '/pages/tjsp/tjsp'
      },
      {

        text: '代币交易',
        picture: '../../image/2@2x.png',
        path: '/pages/jfq/jfq'
      },
      {

        text: '代币充值',
        picture: '../../image/@2x.png',
        path: '/pages/dbcz/dbcz'
      },
      {

        text: '会员福利',
        picture: '../../image/7@2x.png',
        path: '/pages/store_list/store_list'
      }, {

        text: '会员分享',
        picture: '../../image/31@2x.png',
        path: '/pages/fxindex/fxindex'
      },
      {

        text: '交易纠纷处理',
        picture: '../../image/8@2x.png',
        path: '/pages/wq/wq'
      },
      {

        text: '商家入驻',
        picture: '../../image/12@2x.png',
        path: '/pages/sjrz/sjrz'
      }, {

        text: '商家介绍',
        picture: '../../image/17@2x.png',
        path:'/pages/shopjs/shopjs'
      },
      {

        text: '联系我们',
        picture: '../../image/16@2x.png',
        path:'/pages/contact/contact'
      }
    ],
    listData: [
      {
        img: 'http://p6wd1cjvv.bkt.clouddn.com/tempfenxiang.png',
        url: 'http://www.baidu.com',
        title: '儿童山轮车',
        share: '范彬彬',
        num: 123
      }
    ]

  },
  //事件处理函数
  bindViewTap: function (e) {
    //console.log(e)
    ///var index = e.currentTarget.dataset.index;
    //if (this.data.cate_src[index].path) {
    //  if (this.data.cate_src[index].urlType) {
    //    wx.switchTab({
    //      url: this.data.cate_src[index].path
    //    })
    //  } else {
    //    wx.navigateTo({
    //      url: this.data.cate_src[index].path
    //    })
    //  }
//
    //}
    var item = event.currentTarget.dataset['item'];
    wx.navigateTo({
      url: '../detail/detail?id=' + item.id
    })

  },
  goSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  queryFx(cb) {
    var that = this;
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/discuss/firstView',
      method: 'GET',
      success: function (res) {
        that.setData({
          listData: res.data.rows
        });
        cb && cb();
      }

    })
  },
  onPullDownRefresh() {
    var that = this;
    that.queryFx(function () {
      wx.stopPullDownRefresh();
    });
  },
  onLoad: function () {
    var that = this;
    that.queryFx();
  },

})




