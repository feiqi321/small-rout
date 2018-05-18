// components/itemlist/itemlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties:{
    listData: {
      type: Object,
      value: {

      }
    },
  },
  

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoDetail(e){
      var id = parseInt(e.currentTarget.dataset.id);
      wx.navigateTo({
        url: '/pages/goods_detail/goods_detail?id=' + id
      })
    }
  }
})
