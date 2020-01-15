import axios from 'axios';

const service = axios.create({
  baseURL: '',
  timeout: 60000,
});

// request interceptor
service.interceptors.request.use(
  config => config,
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 20000) {
      alert(res.message || 'Error');
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error) => {
    alert(error.message);
    return Promise.reject(error);
  },
);

export default service;
