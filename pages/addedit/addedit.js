// pages/addedit/addedit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId:'',
    linkman: '',
    tel: '',
    detail: '',
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
    var id = options.id;
    that.setData({
      currentId:id
    }) 
    var url;
    if(!id){
      url='https://www.isxcxbackend1.cn/bmh_shop/address/info/0'
    }else{
      url = 'https://www.isxcxbackend1.cn/bmh_shop/address/info/'+id
    }
    wx.request({
      url: url,
      method: 'GET',
      success: function (res) {
        console.log(res)
       
        that.setData({
          linkman:res.data.data.linkman,
          tel: res.data.data.tel,
          detail: res.data.data.detail
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
        id: this.data.currentId,
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
            title: '地址处理成功！',
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
    var id = this.data.currentId;
    console.info(id);
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop//address/info/'+id,
      method: 'DELETE',
      success: function (res) {
        console.log(res)
        if (!res.data.success) {
          wx.showToast({
            title: res.data.errorMsg || '网络异常！',
            icon: 'none',
            duration: 2000
          });
        } else {
          
          wx.navigateTo({
            url: '/pages/address/address'
          })
        }
      }

    })
  }
})