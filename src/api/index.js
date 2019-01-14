import axios from 'axios';
import qs from 'qs';

const parseJson = (jsonStr) => {
  if (typeof jsonStr !== 'string') return jsonStr;
  if (window.JSON) {
    return JSON.parse(jsonStr);
  }
  return eval(`(${jsonStr})`);
}

const instance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    return qs.stringify(data);
  }],
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    let res = null;
    try {
      res = parseJson(data);
    } catch (error) {
      res = data;
    }
    return res;
  }]
})
// 拦截器
instance.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;
