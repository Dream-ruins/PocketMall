// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取地址权限
    scopeAddresFlag: true,
    // 收货地址数据
    addres: {},
    // 购物车信息
    cart: [],
    // 全选
    allChecked: false,
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0,
    // 占位图片
    PlaceholderImg: "http://pic.51yuansu.com/pic3/cover/01/55/70/594c83920937c_610.jpg"
  },

  // 收货地址
  handleChooseAddres() {
    // 不能直接权限
    if (this.data.scopeAddresFlag === false) {
      // 打开权限设置页面
      wx.openSetting({
        success: (res) => {
          this.setData({
            scopeAddresFlag: true
          })
          // 获取收货地址
          wx.chooseAddress({
            success: (resultChoose) => {
              console.log(resultChoose);
              // 将地址存入缓存
              wx.setStorageSync("addres", resultChoose);
            }
          });
        }
      });
      // 可以直接获取权限
    } else {
      wx.chooseAddress({
        success: (result) => {
          console.log(result);
          // 将地址存入缓存
          wx.setStorageSync("addres", result);
        },
        // 点取消
        fail: () => {
          this.setData({
            scopeAddresFlag: false
          })
        }
      });
    }
  },

  // 商品选择框点击事件
  changeChecked(e) {
    // 获取别修改的商品id
    let goodsId = e.currentTarget.dataset.id;
    // 获取购物车信息
    let { cart } = this.data;
    // 找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goodsId)
    // 取反该商品的选择状态
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);
  },

  // 全选点击事件
  changeAllChecked() {
    let { cart, allChecked } = this.data;
    // 取反
    allChecked = !allChecked;
    // 修改cart中的选中状态
    cart.forEach(e => e.checked = allChecked);
    this.setCart(cart)

  },

  // 修改商品个数
  changeGoodsNum(e) {
    let { id, operation } = e.currentTarget.dataset;
    let { cart } = this.data;
    // 找到需要修改对象的索引
    let index = cart.findIndex(v => v.goods_id === id);
    // 判断是否删除商品
    if (cart[index].num === 1 && operation === -1) {
      // 提示框
      wx.showModal({
        title: '删除',
        content: '是否删除该商品',
        success: (res) => {
          if (res.confirm) {
            // 删除
            cart.splice(index, 1);
            this.setCart(cart)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      // 修改商品个数
      cart[index].num += operation;

      this.setCart(cart);
    }
  },

  // 设置cart对象属性
  setCart(cart) {
    // 初始化属性
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(e => {
      if (e.checked) {
        // 计算总价格
        totalPrice += e.goods_price * e.num;
        // 计算总数量
        totalNum += e.num;
      } else {
        // 判断是否全选
        allChecked = false;
      }
    });
    // 判断 cart 是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
    wx.setStorageSync("cart", cart);
  },

  // 结算
  handlePay() {
    let { totalNum, addres } = this.data;
    let flag = true;
    if (!addres.userName) {
      wx.showToast({
        title: '你还没选择收货地址',
        icon: 'none',
        duration: 1000
      })
    }
    if (totalNum === 0) {
      wx.showToast({
        title: '你还没选购商品',
        icon: 'none',
        duration: 1000
      })
    }
    if (addres.userName && totalNum != 0) {
      wx.navigateTo({
        url: '/pages/pay/index'
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 获取缓存中的地址信息
    let addres = wx.getStorageSync("addres");
    try {
      addres.all = addres.provinceName + addres.cityName + addres.countyName + addres.detailInfo;
    } catch (error) {
      console.log(error);
    }
    // 获取缓存中的购物车信息
    let cart = wx.getStorageSync("cart") || [];
    this.setData({ addres });

    this.setCart(cart)
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