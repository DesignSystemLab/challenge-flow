import axios from 'axios';
import { ApplicationError } from './constants/appplicationError';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 3000
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => error
);

axiosInstance.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (data && status) {
        return Promise.reject(data.message ?? ApplicationError.UNKNOWN);
      }

      if (status) {
        switch (status) {
          case 400:
            return Promise.reject(ApplicationError.BADREQUEST);
          case 401:
            return Promise.reject(ApplicationError.UNAUTHORIZED);
          case 403:
            return Promise.reject(ApplicationError.FROBIDDEN);
          case 404:
            return Promise.reject(ApplicationError.NOTFOUND);
          case 503:
            return Promise.reject(ApplicationError.FIREBASE);
          default:
            return Promise.reject(ApplicationError.SERVER);
        }
      }
    }
    return Promise.reject(error ?? ApplicationError.UNKNOWN);
  }
);

export default axiosInstance;
