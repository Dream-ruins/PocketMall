// pages/goods_detail/index.js
import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情数据
    goodsInfo: {},
    // 商品id
    goodsId: ""

  },

  // 获取商品详情数据
  getGoodsInfo() {
    request({
      url: "/goods/detail",
      data: { goods_id: this.data.goodsId }
    }).then((result) => {
      let goodsInfo = result.data.message;
      this.setData({
        goodsInfo
      })
    })
  },
  // 轮播图预览
  handldeSwiperItem(e) {
    let urls = this.data.goodsInfo.pics.map(v => v.pics_mid)
    let current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  // 加入购物车
  handleAddCart() {
    // 获取本地缓存数据
    let cart = wx.getStorageSync("cart") || [];
    // 判断本地是否缓存了数据
    let index = cart.findIndex(v => v.goods_id === this.data.goodsInfo.goods_id);
    if (index === -1) {
      // 如果不存在
      this.data.goodsInfo.num = 1;
      // 是否选中
      this.data.goodsInfo.checked = true;
      cart.push(this.data.goodsInfo);
    } else {
      // 如果存在增加购买数量
      cart[index].num++;
    }
    // 将购物车数据缓存在本地
    wx.setStorageSync("cart", cart);

    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取传值过来的商品id
    let goodsId = options.goods_id;
    this.setData({
      goodsId
    });

    this.getGoodsInfo();
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