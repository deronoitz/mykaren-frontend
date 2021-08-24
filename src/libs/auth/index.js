import Router from "next/router";
import { API_CODES } from "consts/api";
import { parseCookies, destroyCookie, setCookie } from "nookies";

export const tokenLabel = "mykaren-token";
export const refreshTokenLabel = "mykaren-refresh-token";

const TOKEN_MAX_AGE = 60 * 60; // 1 hour
const REFRESH_TOKEN_MAX_AGE = 15 * 24 * 60 * 60; // 15 days

export function getToken() {
  const cookies = parseCookies();
  return {
    token: cookies[tokenLabel],
    refreshToken: cookies[refreshTokenLabel]
  };
}

export function destroyToken() {
  destroyCookie(null, tokenLabel, { path: "/" });
  destroyCookie(null, refreshTokenLabel, { path: "/" });
}

export function setToken(token, refreshToken) {
  setCookie(null, tokenLabel, token, { maxAge: TOKEN_MAX_AGE, path: "/" });
  setCookie(null, refreshTokenLabel, refreshToken, { maxAge: REFRESH_TOKEN_MAX_AGE, path: "/" });
}

export function logout(redirect) {
  destroyToken();
  Router.push(!redirect ? "/login" : { pathname: "/login", query: { redirect } });
}

export function forwardMaintenance() {
  Router.push("/maintenance");
}

export function requireAuthentication(callback) {
  return async (context) => {
    const { req, res } = context;
    const cookies = parseCookies({ req });

    if (!cookies[tokenLabel] && !cookies[refreshTokenLabel]) {
      res.statusCode = API_CODES.FOUND;
      res.setHeader("Location", "/login");
    }

    return await callback(context);
  };
}
