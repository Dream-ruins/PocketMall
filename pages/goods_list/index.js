// pages/goods_list/index.js
import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    }],
    // 商品数据
    goodsList: [],
    // 占位图片
    PlaceholderImg: "http://pic.51yuansu.com/pic3/cover/01/55/70/594c83920937c_610.jpg"
  },
  // 参数数据
  queryData: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 数据总页数
  pageTotal: 0,

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

  // 获取商品信息
  getGoodsList() {
    request({
      url: "/goods/search",
      data: this.queryData
    }).then((result) => {
      let goodsList = result.data.message.goods;
      // 算出数据总页数
      this.pageTotal = Math.ceil(result.data.message.total / this.queryData.pagesize);
      // 将 data 中的数据进行修改
      this.setData({
        goodsList: [...this.data.goodsList, ...goodsList]
      })
    })

    // 改变下拉刷新效果
    wx.stopPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { cid } = options;
    this.queryData.cid = cid;
    // 初始化商品列表数据
    this.goodsList = [];

    // 获取商品数据
    this.getGoodsList();
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
    // 清空商品数据
    this.setData({
      goodsList: []
    })
    // 重置商品页数
    this.queryData.pagenum = 1;
    this.getGoodsList();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 加载后面的数据
    if (this.pageTotal >= this.queryData.pagenum) {
      // 获取下一页数据
      this.queryData.pagenum++;
      this.getGoodsList();
    } else {
      // 没有数据
      wx.showToast({
        title: '这已经是最后的商品了',
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})