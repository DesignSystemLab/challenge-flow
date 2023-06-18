import axios from 'axios';

export const request = axios.create({
  baseURL: '/api',
  timeout: 3000
});

request.interceptors.request.use(
  (config) => config,
  (error) => error
);

export default request;
