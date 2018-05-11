// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: 'q',
    code: '',
  },
  listenerPhoneInput: function (e) {
    this.data.phone = e.detail.value;
  },

  /**
   * 监听密码输入
   */
  listenerPasswordInput: function (e) {
    this.data.code = e.detail.value;
  },
  submit() {
    var reg = new RegExp(/^1[0-9]{10}$/);
    if (!reg.test(this.data.phone) || this.data.code=="") {
      wx.showToast({
        title: '请完善你的用户信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }
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
            title: res.data.errorMsg||'网络异常！',
            icon: 'none',
            duration: 2000
          });
        }else{
          wx.setStorageSync('userName', res.data.data.id);
          wx.setStorageSync('amt', res.data.data.balance);
          wx.setStorageSync('tel', res.data.data.username);
          wx.switchTab({
            url: '/pages/usercenter/usercenter'
          })
        }
      }

    })
  },
  getcode() {
    var reg = new RegExp(/^1[0-9]{10}$/);
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/sms/sendSms',
      data:{
        tel: this.data.phone
      },
      method: 'GET',
      success: function (res) {
        if(res.success){
          wx.showToast({
            title: '发送成功！',
            icon: 'none',
            duration: 2000
          })
        };
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('userName')) {
      wx.switchTab({
        url: '/pages/usercenter/usercenter'
      })
    }
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
    // if (wx.getStorageSync('userName')) {
    //   wx.navigateTo({
    //     url: '/pages/usercenter/usercenter'
    //   })
    // }
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
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
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

  }
})