// pages/login/login.js
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  currentTab:0,
  data: {
    sendLoginmsg: "getcode",
    sendRegistmsg: "getcode",
    getLoginmsg: "获取验证码", 
    getRegistmsg: "获取验证码", 
    currentTime:61,
    phone: 'q',
    code: '',
    referee:'',
  },
  listenerPhoneInput: function (e) {
    this.data.phone = e.detail.value;
  },
  listenerRefereeInput: function (e) {
    this.data.referee = e.detail.value;
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
        sms: this.data.code,
        referee: this.data.referee
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
  register() {
    var reg = new RegExp(/^1[0-9]{10}$/);
    if (!reg.test(this.data.phone) || this.data.code == "") {
      wx.showToast({
        title: '请完善你的用户信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (this.data.referee == "") {
      wx.showToast({
        title: '邀请人不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/app/account/register',
      data: {
        username: this.data.phone,
        sms: this.data.code,
        referee: this.data.referee
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
          wx.setStorageSync('amt', res.data.data.balance);
          wx.setStorageSync('tel', res.data.data.username);
          wx.switchTab({
            url: '/pages/usercenter/usercenter'
          })
        }
      }

    })

  },
  
  back(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  getRegistcode() {
    var reg = new RegExp(/^1[0-9]{10}$/);
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (this.data.sendRegistmsg == "getcodeafter") {
      wx.showToast({
        title: '60秒内不能重复发送',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        sendRegistmsg: "getcodeafter",
        getRegistmsg: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          sendRegistmsg: "getcode",
          getRegistmsg: '获取验证码',
          currentTime: 61
        })
      }
    }, 1000)  


    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/sms/sendSms',
      data:{
        tel: this.data.phone,
        type: 1
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
  getLogincode() {
    var reg = new RegExp(/^1[0-9]{10}$/);
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (this.data.sendLoginmsg =="getcodeafter"){
      wx.showToast({
        title: '60秒内不能重复发送',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        sendLoginmsg:"getcodeafter",
        getLoginmsg: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          sendLoginmsg: "getcode",
          getLoginmsg: '获取验证码',
          currentTime: 61
        })
      }
    }, 1000)  
    
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/sms/sendSms',
      data: {
        tel: this.data.phone,
        type:2
      },
      method: 'GET',
      success: function (res) {
        if (res.success) {
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
    var that = this;
    if (wx.getStorageSync('userName')) {
      wx.switchTab({
        url: '/pages/usercenter/usercenter'
      })
    }
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          currentTab: 0
        });
       
      }

    }); 
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
    console.log(1)
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

  },
  /** 
    * 滑动切换tab 
    */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },  
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }  

})