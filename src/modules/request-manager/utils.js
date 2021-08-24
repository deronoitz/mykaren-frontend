import axios, { CancelToken } from "axios";
import { setToken, logout, forwardMaintenance, tokenLabel, refreshTokenLabel } from "libs/auth";
import { getSafely } from "libs/object";
import { getFormData } from "libs/form-data";
import { parseCookies } from "nookies";
import { API_CODES } from "consts/api";
import Router from "next/router";
import endpoints from "../endpoints";
import getConfig from "next/config";

const source = CancelToken.source();
const UNKNOWN_ERROR_MESSAGE = "Unknown error";
const { publicRuntimeConfig } = getConfig();

export function getApiHeader(withToken) {
  const cookies = parseCookies();
  return {
    Authorization: withToken ? `Bearer ${cookies[tokenLabel]}` : ""
  };
}

export async function fetchRefreshToken(error) {
  let originalRequest = error.config;
  const cookies = parseCookies();
  const refreshToken = cookies[refreshTokenLabel];
  const { asPath } = Router;

  if (!originalRequest._retry && refreshToken) {
    originalRequest._retry = true;
    const formData = getFormData({ refresh_token: refreshToken });
    await axios({
      method: "post",
      url: publicRuntimeConfig.baseUrl + endpoints.authentication.refreshToken,
      data: formData,
      cancelToken: source.token,
      headers: {
        "content-type": "multipart/form-data"
      }
    })
      .then((res) => {
        if (res.status === API_CODES.SUCCESS) {
          const { data } = res;
          setToken(data.token, data.refresh_token);

          return axios({
            ...originalRequest,
            headers: {
              ["Authorization"]: "Bearer " + data.token
            }
          });
        }
      })
      .catch((err) => {
        logout(asPath);
        return Promise.reject([{ message: err }]);
      });
  } else {
    logout(asPath);
  }
}

export function isFormData(headers) {
  return headers["content-type"] === "multipart/form-data";
}

export function createResponseInterceptor(response) {
  return response;
}

export function createResponseErrorInterceptor(error) {
  const errorResponse = getSafely(["response"], error);
  if (!errorResponse) {
    return Promise.reject([{ message: UNKNOWN_ERROR_MESSAGE }]);
  } else if (error.response.status === API_CODES.UNAUTHENTICATED) {
    fetchRefreshToken(error);
  } else if (error.response.status === API_CODES.UNAVAILABLE) {
    forwardMaintenance();
  } else if (error.response.status === API_CODES.INVALID_ARGUMENT) {
    return Promise.reject({ message: errorResponse.data.details });
  } else if (error.response.status === API_CODES.NOT_FOUND) {
    return Promise.reject({ message: errorResponse.data.message });
  } else if (error.response.status === API_CODES.UNKNOWN) {
    return Promise.reject({ message: errorResponse.data.message });
  } else {
    return handleApiResponseError(error);
  }
}

function handleApiResponseError(error) {
  let errors = getSafely(["data", "errors"], error.response);
  if (errors) return Promise.reject(errors);

  errors = getSafely(["statusText"], error.response);
  if (errors) return Promise.reject([{ message: errors }]);

  return Promise.reject([{ message: UNKNOWN_ERROR_MESSAGE }]);
}
