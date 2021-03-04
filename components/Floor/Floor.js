// components/Floor/Floor.js
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
    floorData: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getFloorData() {
      request({
        url: "/home/floordata",
      }).then((result) => {
        this.setData({
          floorData: result.data.message
        })
      })
    },
  },

  attached() {
    this.getFloorData()
  }
})
