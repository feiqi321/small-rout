//index.js
//获取应用实例
const app = getApp()
import config from "../../config.js"



Page({
    data: {
        imgUrls: [
        ],
        movies: [
        ],
        commentlist:[
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        productDetail:{},
        commitContent:"",
        id:""
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    // 收藏取消收藏
    storeTap:function(){
        var self=this;
        var userId = wx.getStorageSync("userName");
        wx.request({
            url: config.storeShare,
            data: {
                "id": this.data.productDetail.id,
                "userId": userId
            },
            method: "POST",
            header: {
                'content-type': 'application/json', // 默认值
                'TN-REQ-DATA-TYPE': 'json/text'
            },
            success: function (res) {
                console.log(res);
                if (res.data.success) {
                    self.refresh()
                }
            },
            complete: function () {
                wx.hideLoading();
            }
        })
    },
    // 发表评论
    writeCommitTap: function (e){
        var self=this;
        var userId = wx.getStorageSync("userName");
        if (userId == null || userId==""){
          wx.showToast({
            title: '还未登陆！请先登陆',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        if (this.data.commitContent == null || this.data.commitContent == "" || this.data.commitContent.length<=10) {
          wx.showToast({
            title: '发布内容必须超过10个字',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        console.info(userId)
        wx.request({
            url: config.writeCommit,
            data: {
                "discussId": this.data.productDetail.id, 
                "userId": userId,
                "context": this.data.commitContent
            },
            method: "POST",
            header: {
                'content-type': 'application/json', // 默认值
                'TN-REQ-DATA-TYPE': 'json/text'
            },
            success: function (res) {
                console.log(res);
                if (res.data.success) {
                    self.setData({
                        commitContent:""
                    });
                    self.refresh()
                }
            },
            complete: function () {
                wx.hideLoading();
            }
        })
    },
    // 加载页面
    onLoad: function (options) {
        var self =this;
        console.log("id:", options.id);
        self.data.id = options.id;
        self.refresh()
    },
    refresh:function(){
        wx.showLoading();
        var self = this;
        // var detailUrl = config.getProductDetail + self.data.id;
        var userId = wx.getStorageSync("userName");
        wx.request({
            url: config.getProductDetail,
            data: {
                id: self.data.id,
                userId: userId
            },
            method: "GET",
            header: {
                'content-type': 'application/json', // 默认值
                'TN-REQ-DATA-TYPE': 'json/text'
            },
            success: function (res) {
                console.log(res);
                if (res.data.success) {
                    self.setData({
                        productDetail: res.data.data,
                        movies: res.data.data.urls,
                        commentlist: res.data.rows
                    });
                }
            },
            complete: function () {
                wx.stopPullDownRefresh();
                wx.hideLoading();
            }
        })
    },
    changeIndicatorDots: function (e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function (e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function (e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function (e) {
        this.setData({
            duration: e.detail.value
        })
    },
    bindTextAreaBlur: function (e) {
        console.log("blur",e.detail.value)
        this.data.commitContent = e.detail.value;
    },
    // 下拉刷新回调接口
    onPullDownRefresh: function () {
       
        // do somthing
        this.refresh();
    },
})
