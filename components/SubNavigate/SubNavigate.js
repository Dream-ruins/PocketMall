// components/SubNavigate/SubNavigate.js
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
    subNavigeteList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取次级导航数据
    getSubNavigeteList() {
      request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      }).then((result) => {
        this.setData({
          subNavigeteList: result.data.message
        })
      })
    },
  },

  attached() {
    this.getSubNavigeteList()
  }
})
