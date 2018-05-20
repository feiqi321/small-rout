//index.js

Page({
    data:{
      dblist: [
        
      ],
      cardlist: [
       
      ]
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
      var that = this;
      wx.request({
        url: 'https://www.isxcxbackend1.cn/bmh_shop/welfare/table?userId=' + wx.getStorageSync('userName')+'&type=1',
        method: 'GET',
        success: function (res) {
          that.setData({
            dblist: res.data.rows
          })
        }

      }),
        wx.request({
        url: 'https://www.isxcxbackend1.cn/bmh_shop/welfare/table?userId=' + wx.getStorageSync('userName')+'&type=2',
          method: 'GET',
          success: function (res) {
            that.setData({
              cardlist: res.data.rows
            })
          }

        })
    },

});

