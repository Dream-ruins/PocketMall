// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品分类id
    cid: '',
    // 导航栏
    tabs: [{
      tab_id: 0,
      tab_title: "综合",
      isActive: true
    },
    {
      tab_id: 1,
      tab_title: "销量",
      isActive: false
    },
    {
      tab_id: 2,
      tab_title: "价格",
      isActive: false
    }]
  },

  // 子组件标题点击事件
  handleTabsItemChange(e) {
    // 被点击标题的索引
    let { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false
    });
    // 将修改过的数据重新设置给 data
    this.setData({
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { cid } = options;
    this.setData({
      cid
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