import axios, { isAxiosError } from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  config.withCredentials = true
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {

    if (isAxiosError(error) && error.response) {
      const status = error.response.status
      const message = error.response.data.message

      if (status === 401 && message === String(import.meta.env.VITE_EXPIRES_ERROR)) {
        location.replace('/auth/login');
        return;
      }
    }

    return Promise.reject(error);
  }
);


export default api;