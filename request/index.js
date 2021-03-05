// 同时发送异步代码的次数
let ajaxTime = 0;
export const request = ((params) => {
  ajaxTime++;
  // 加载图标
  wx.showLoading({
    title: '加载中',
    mask: true
  });

  // 公共 URL
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";

  return new Promise((resolve, reject) => {
    wx.request({
      //解析参数
      ...params,
      url: baseUrl + params.url,
      //成功
      success: ((result) => {
        resolve(result);
      }),
      //失败
      fail: ((err) => {
        reject(err);
      }),
      complete: (() => {
        ajaxTime--;
        if (ajaxTime === 0) {
          // 关闭加载中图标
          wx.hideLoading()
        }
      })
    })
  });
});