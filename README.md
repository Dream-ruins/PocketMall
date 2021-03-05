# 掌上商城

**微信小程序**

## 接口

### 首页

- 首页轮播图："https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
- 首页次级导航栏图片："https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"
- 首页楼层商品图片："https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"

### 分类

- 商品分类："https://api-hmugo-web.itheima.net/api/public/v1/categories"

### 商品

- 商品列表搜索："https://api-hmugo-web.itheima.net/api/public/v1/goods/search"

  - query 关键字 string
  - cid 分类 id string
  - pagenum 页码 number
  - pagesize 页容量 number

- 商品详情："https://api-hmugo-web.itheima.net/api/public/v1/goods/detail"
  - goods_id 商品 id number
