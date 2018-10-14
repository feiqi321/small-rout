// pages/addedit/addedit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId:'',
    orderId:'',
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
    var orderId = options.orderId;
    that.setData({
      currentId:id,
      orderId: orderId
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
<<<<<<< Updated upstream


        that.setData({
          linkman:res.data.data.linkman,
          tel: res.data.data.tel,
          detail: res.data.data.detail
        })    



=======
        that.data.linkman = res.data.data.linkman,
          that.data.tel = res.data.data.tel,
          that.data.detail = res.data.data.detail
        //that.setData({
        //  linkman = res.data.data.linkman,
        //  tel = res.data.data.tel,
        //  detail = res.data.data.detail
        //})
        
     
        
>>>>>>> Stashed changes
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
    var _this=this;
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
            var idUrl='';
            if (_this.data.orderId){
              idUrl = '?orderId=' + _this.data.orderId;
            }
            wx.navigateTo({
              url: '/pages/address/address'+idUrl
            })
          }, 800)
          
        }
      }

    })
  },
  delete() {
    var id = this.data.currentId;
    var _this=this;
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
          var idUrl = '';
          if (_this.data.orderId) {
            idUrl = '?orderId=' + _this.data.orderId;
          }
          wx.navigateTo({
            url: '/pages/address/address' + idUrl
          })
        }
      }

    })
  }
})