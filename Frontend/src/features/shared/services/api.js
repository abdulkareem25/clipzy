import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) return prom.reject(error)
    else return prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async (error) => {

    const originalRequest = error.config;
    const requestUrl = originalRequest?.url ?? '';
    const shouldSkipRefresh = requestUrl.includes('/auth/refresh');

    if (error.response?.status === 401
      && !shouldSkipRefresh
      && originalRequest
      && !originalRequest._retry
    ) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      };

      originalRequest._retry = true;
      isRefreshing = true;

      try {

        await api.post('/auth/refresh');
        processQueue(null);
        return api(originalRequest);

      } catch (refreshError) {

        processQueue(refreshError, null);
        return Promise.reject(refreshError);

      } finally {
        isRefreshing = false;
      };
    };
    return Promise.reject(error);
  }
);

export default api;