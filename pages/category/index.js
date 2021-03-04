// pages/category/index.js
import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 总数据
    categoriesList: [],
    // 左侧分类数据
    leftMenuList: [],
    // 右侧商品数据
    rightGoodsData: [],
    // 被选中的分类索引
    currentIndex: 0,
    // 右侧滚动条到顶部距离
    scrollTop: 0
  },

  // 获取商品分类信息
  getCategoriesList() {
    request({
      url: "/categories",
    }).then((result) => {
      // 总数据
      let categoriesList = result.data.message;
      // 左侧分类数据
      let leftMenuList = categoriesList.map(v => v.cat_name);
      // 右侧商品数据
      let rightGoodsData = categoriesList[0].children;
      // 将分类数据存储在本地
      wx.setStorageSync("categoriesList", { time: Date.now(), data: categoriesList });
      // 将 data 中的数据进行修改
      this.setData({
        categoriesList,
        leftMenuList,
        rightGoodsData
      })
    })
  },

  // 将点击的分类设置为选中的分类
  handleMenuItem(e) {
    const currentIndex = e.currentTarget.dataset.index;
    // 更新分类商品数据
    let rightGoodsData = this.data.categoriesList[currentIndex].children;
    this.setData({
      currentIndex,
      rightGoodsData,
      // 重置右侧滚动条位置
      scrollTop: 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地分类数据
    const categoriesList = wx.getStorageSync("categoriesList");;
    // 判断本地是否存在本地数据
    if (!categoriesList) {
      // 获取分类数据
      this.getCategoriesList();
    } else {
      // 数据是否过期（5分钟）
      if (Date.now() - categoriesList > 1000 * 300) {
        this.getCategoriesList();
      } else {
        // 将本地数据赋值给 data 中的数据
        this.data.categoriesList = categoriesList.data;
        // 左侧分类数据
        let leftMenuList = this.data.categoriesList.map(v => v.cat_name);
        // 右侧商品数据
        let rightGoodsData = this.data.categoriesList[0].children;
        // 将 data 中的数据进行修改
        this.setData({
          leftMenuList,
          rightGoodsData
        })
      }
    }
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