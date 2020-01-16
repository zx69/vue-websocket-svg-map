import axios from 'axios';

const service = axios.create({
  baseURL: '',
  timeout: 60000,
});

service.interceptors.request.use(
  config => config,
  (error) => {
    return Promise.reject(error);
  },
);

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
