//index.js

Page({
    data:{
      dblist: [
        { id: 0, text: '1代币' },
        { id: 1, text: '2代币' },
        { id: 2, text: '3代币' },
        { id: 3, text: '4代币' }
      ]
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
      var that = this;
      wx.request({
        url: 'https://www.isxcxbackend1.cn/bmh_shop/welfare/table?userId=18&type=2',
        method: 'GET',
        success: function (res) {
          that.setData({
            dblist: res.data.rows
          })
        }

      })
    },

});

