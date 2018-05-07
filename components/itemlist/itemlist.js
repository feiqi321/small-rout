// components/itemlist/itemlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties:{
    listData: {
      type: Object,
      value: {
        img: 'http://mmbiz.qpic.cn/mmbiz_jpg/zKZ7UQnGpOFIQrI4tNrlbNLdK7TLicwYCColZoENm2WF2LEhGngkL7OG4vicV47cYKYCgLTau2VZNbX6ic46oEVaw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
        url: 'http://www.baidu.com',
        price: 100,
        title: '儿童山轮车1'
      }
    },
  },
  

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoDetail(){
      wx.navigateTo({
        url: '/pages/goods_detail/goods_detail'
      })
    }
  }
})
