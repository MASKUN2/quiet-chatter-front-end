import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { API, MESSAGES } from '../constants';

export const apiClient = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true,
  timeout: API.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class ApiError extends Error {
  response?: AxiosResponse;
  constructor(message: string, response?: AxiosResponse) {
    super(message);
    this.name = 'ApiError';
    this.response = response;
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.response?.data?.message || error.message || MESSAGES.ERROR.API_REQUEST_FAILED;
    return Promise.reject(new ApiError(message, error.response));
  }
);
