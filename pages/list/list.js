// 字体tabtab切换
Page({
    data:{   
      listData: [
       // {
        //  img: 'http://mmbiz.qpic.cn/mmbiz_jpg/zKZ7UQnGpOFIQrI4tNrlbNLdK7TLicwYCColZoENm2WF2LEhGngkL7OG4vicV47cYKYCgLTau2VZNbX6ic46oEVaw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
        //  url: 'http://www.baidu.com',
        //  price: 100,
        //  title: '儿童山轮车'
       // }
      ]
    },
    upper: function (e) {
      console.log(e)
    },
    lower: function (e) {
      console.log(e)
    },
    scroll: function (e) {
      console.log(e)
    },
    onReachBottom(e){
      console.log(111)
    },
    onLoad: function () {
      var that = this;
      wx.request({
        url: 'https://www.isxcxbackend1.cn//bmh_shop/product/info/table?page=1&rows=10',
        method: 'GET',
        success: function (res) {
          that.setData({
            listData: res.data.rows
          })
        }

      })
    },
  
})