import { setCookie } from "nookies";

export function setAuthCookies(res, { accessToken }) {
  setCookie({ res }, "accessToken", accessToken, {
    maxAge: 14 * 24 * 60 * 60,
    path: "/",
  });
}