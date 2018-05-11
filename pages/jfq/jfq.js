// jfq/jfq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,  
    phone:null,
    jfnumber:null,
    objdata:{
     // totalPoint:1099,
     // inPoint:300,
     // outPoint:200
    },
    listdata: [
      //{
      //  text: '张三赠送',
      //  time: '2017-12-23 12:25:23',
      //  jf: '+200',
      //  id: 1
     // }
    ]
  },
  listenerphoneInput: function (e) {
    this.data.phone = e.detail.value;
  },
  listenernumInput: function (e) {
    this.data.jfnumber = e.detail.value;
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    var that = this;
    var userId = wx.getStorageSync("userName");
    if (!userId || !this.data.phone || !this.data.jfnumber){
      wx.showToast({
        title: '请完善信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/point/update',
      method: 'POST',
      data:{
        sendUserId: userId,
        acceptUsername: this.data.phone,
        amount: this.data.jfnumber
      },
      success: function (res) {
        console.log(res);
      }

    })
    // this.setData({
    //   hiddenmodalput: true
    // })
  } ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userId = wx.getStorageSync("userName");
    wx.request({
      url: 'https://www.isxcxbackend1.cn/bmh_shop/point/list?userId=' + userId,
      method: 'GET',
      success: function (res) {
        that.setData({
          listdata: res.data.rows,
          objdata: res.data.data
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

  }




})