import axios, { CancelToken, isCancel } from "axios";
import useSWR from "swr";
import qs from "query-string";
import getConfig from "next/config";

import { createResponseInterceptor, createResponseErrorInterceptor, getApiHeader, isFormData } from "./utils";
import { getFormData } from "libs/form-data";

const instance = axios.create();
const getHeader = (headers, withToken) => ({ ...getApiHeader(withToken), ...headers });
const { publicRuntimeConfig } = getConfig();

instance.CancelToken = CancelToken;
instance.isCancel = isCancel;

instance.defaults.baseURL = publicRuntimeConfig.baseUrl;

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(createResponseInterceptor, createResponseErrorInterceptor);

const fetcherGet = async (url, customHeaders = {}, withToken = true) => {
  const headers = getHeader(customHeaders, withToken);
  const res = await instance({ method: "get", url, headers });
  return res.data;
};

const fetcherPost = async (url, customHeaders = {}, data = {}, withToken = true) => {
  const headers = getHeader(customHeaders, withToken);
  const processedData = isFormData(headers) ? getFormData(data) : qs.stringify(data);

  return await instance({ method: "post", url, headers, data: processedData });
};

const fetcherPut = async (url, customHeaders = {}, data = {}, withToken = true) => {
  const headers = getHeader(customHeaders, withToken);
  const processedData = isFormData(headers) ? getFormData(data) : qs.stringify(data);

  return await instance({ method: "put", url, headers, data: processedData });
};

const get = (contract) => {
  const { url, params, headers, withToken, options } = contract;
  const query = qs.stringify(params);
  const urlWithParams = query ? url + "?" + query : url;
  return useSWR(url ? [urlWithParams, headers, withToken] : null, fetcherGet, options);
};

const post = async (contract) => {
  const { url, data, headers, withToken } = contract;
  return fetcherPost(url, headers, data, withToken);
};

const put = async (contract) => {
  const { url, data, headers, withToken } = contract;
  return fetcherPut(url, headers, data, withToken);
};

export default {
  get,
  post,
  put
};
