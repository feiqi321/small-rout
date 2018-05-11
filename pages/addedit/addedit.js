// pages/addedit/addedit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{
      linkman:"",
      tel:"",
      detail:""
    }
  },
  listenerlinkmanInput: function (e) {
    this.data.linkman = e.detail.value;
  },
  listenerTelInput: function (e) {
    this.data.tel = e.detail.value;
  },
  listenerAddressInput: function (e) {
    this.data.detail = e.detail.value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = 1;
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/address/info/1',
      method: 'GET',
      success: function (res) {
        that.setData({
          listData: res.data.rows
        })
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
  
  },
  submit() {
    var userId = wx.getStorageSync("userName");
    if (this.data.linkman == "" || this.data.tel == "" || this.data.detail == "") {
      wx.showToast({
        title: '请完善你的联系人信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/address/info/update',
      data: {
        userid:userId,
        linkman: this.data.linkman,
        tel: this.data.tel,
        detail: this.data.detail
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (!res.data.success) {
          wx.showToast({
            title: res.data.errorMsg || '网络异常！',
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '申诉请求已发送',
            icon: 'none',
            duration: 2000
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/address/address'
            })
          }, 800)
          
        }
      }

    })
  },
  delete() {
    
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/app/account/login',
      data: {
        username: this.data.phone,
        sms: this.data.code
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (!res.data.success) {
          wx.showToast({
            title: res.data.errorMsg || '网络异常！',
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.setStorageSync('userName', res.data.data.id);
          wx.switchTab({
            url: '/pages/address/address'
          })
        }
      }

    })
  }
})