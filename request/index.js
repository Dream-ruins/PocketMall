export const request = ((params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      //解析参数
      ...params,
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