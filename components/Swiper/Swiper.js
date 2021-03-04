// components/Swiper/Swiper.js
import { request } from "../../request/index";
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取轮播图数据
    getSwiperList() {
      request({
        url: "/home/swiperdata",
      }).then((result) => {
        this.setData({
          swiperList: result.data.message
        })
      })
    },
  },

  attached() {
    this.getSwiperList()
  }

})
