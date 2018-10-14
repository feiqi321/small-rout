/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

// 测试域名
var host = "https://www.isxcxbackend1.cn"


// "appid": "wx6bc897bf94e62e6e",  正式
// "appid": "wx7dea410a3c4a62a1",  测试

var config = {

    // 下面的地址配合云端 Server 工作
    host,
    
    // 获取
    getProductListUrl: `${host}/bmh_shop/discuss/all`,

    // 点赞
    praiseUrl: `${host}/bmh_shop/discuss/praise`,

    // 详情
    getProductDetail: `${host}/bmh_shop/discuss/detail/`, 

    // 评论
    writeCommit: `${host}/bmh_shop/comment/update`,

    // 收藏
    storeShare: `${host}/bmh_shop/discuss/store`,
};

module.exports = config
