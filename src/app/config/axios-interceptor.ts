import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { API_URL } from "../shared/constants/api";

export const setupAxiosInterceptor = () => {
  const onRequestSuccess = (config: AxiosRequestConfig) => {
    const { url } = config;
    config.url =
      url && API_URL && !url.includes(API_URL) ? `${API_URL}${url}` : url;
    return config;
  };

  const onResponseSuccess = (response: AxiosResponse) => response;

  const onResponseError = async (error: any) => Promise.reject(error);

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};
