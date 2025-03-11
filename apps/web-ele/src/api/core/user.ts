/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  // console.log(requestClient.get<UserInfo>('/user/info'));
  // return requestClient.get<UserInfo>('/user/info');

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('First');
      resolve({aaa: 'aaa'});
    }, 1000);
  });
  // return
}

/**
 * 百度
 */
export async function baidu(data) {
  return requestClientB.get<UserInfo>(`/api?${data}`);
  // const queryString = `https://fanyi-api.baidu.com/api/trans/vip/translate?${objectToQueryString(apiData)}`;
}
