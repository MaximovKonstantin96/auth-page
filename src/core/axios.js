import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backend-front-test.dev.echo-company.ru',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default instance;
