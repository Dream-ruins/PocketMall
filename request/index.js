export const request = ((params) => {
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
      })
    })
  });
});