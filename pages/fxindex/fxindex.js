//index.js
//获取应用实例
import config from "../../config.js"
const app = getApp()

var userId = 50;

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        infoList: []
    },
    //事件处理函数
    bindViewTap: function (event) {
        
        var item = event.currentTarget.dataset['item'];
        wx.navigateTo({
            url: '../detail/detail?id=' + item.id
        })
    },
    // 点赞
    thumbsUpTap: function (event){
        var self =this;
        var item = event.currentTarget.dataset['item'];
        console.log("thumbs tap",item);
        // 校验
        if (item.assess){
            return;
        }else{
            wx.request({
                url: config.praiseUrl,
                data: {
                    id: item.id,
                    userId: userId
                },
                method: "POST",
                header: {
                    'content-type': 'application/json', // 默认值
                    'TN-REQ-DATA-TYPE': 'json/text'
                },
                success: function (res) {
                    console.log(res);
                    if (res.data.success) {
                        self.onLoad();
                    }
                },
                complete: function () {
                    wx.hideLoading();
                }
            })
        }    
    },
    // 初始化加载 
    onLoad: function () {
        var self =this ;
        wx.request({
            url: config.getProductListUrl,
            // url:"https://www.isxcxbackend1.cn/bmh_shop/discuss/all",
            data: {
                page: 1,
                rows:5,
                userId: userId
            },
            method: "GET",
            header: {
                'content-type': 'application/json', // 默认值
                'TN-REQ-DATA-TYPE': 'json/text'
            },
            success: function (res) {
                console.log(res);
                if (res.data.success){
                    self.setData({
                        infoList: res.data.rows
                    });
                }
            },
            complete: function () {
                wx.hideLoading();
            }
        })
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})
