import { parseCookies } from "nookies";
import { getFormData } from "libs/getFormData";

import QS from "query-string";

export function fetcherWithBody(contract) {
  let fetcher = async (data) => {
    let cookies = parseCookies();
    let result = await fetch(contract.path, {
      method: contract.method,
      body: JSON.stringify(data),
      headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: contract.withToken ? `Bearer ${cookies.accessToken}` : undefined
      }
    }).then((res) => res.json());
    return result;
  };
  return fetcher;
}

export function fetcherWithBodyNotJson(contract) {
  let fetcher = async (data) => {
    let cookies = parseCookies();
    let result = await fetch(contract.path, {
      method: contract.method,
      body: JSON.stringify(data),
      headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: contract.withToken ? `Bearer ${cookies.accessToken}` : undefined
      }
    }).then((res) => res);
    console.log(result);
    return result;
  };
  return fetcher;
}

export function fetcherGet(contract) {
  let fetcher = async () => {
    let cookies = parseCookies();
    let result = await fetch(contract.path, {
      method: "get",
      headers: {
        ["Authorization"]: contract.withToken ? `Bearer ${cookies.accessToken}` : undefined
      }
    }).then((res) => res.json());
    return result;
  };
  return fetcher;
}

export function fetcherWithParams(contract, ctx) {
  let fetcher = async (data) => {
    let cookies = parseCookies(ctx ? ctx : null);
    let result = await fetch(`${contract.path}?${QS.stringify(data)}`, {
      method: contract.method,
      headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: contract.withToken ? `Bearer ${cookies.accessToken}` : undefined
      }
    }).then((res) => res.json());
    return result;
  };
  return fetcher;
}
export function fetcherWithParamsBody(contract, ctx) {
  let fetcher = async (params, data) => {
    let cookies = parseCookies(ctx ? ctx : null);
    let result = await fetch(`${contract.path}/${params}`, {
      method: contract.method,
      body: JSON.stringify(data),
      headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: contract.withToken ? `Bearer ${cookies.accessToken}` : undefined
      }
    }).then((res) => res);
    return result;
  };
  return fetcher;
}

export function fetcherUpload(contract) {
  let fetcher = async (data) => {
    let formData = getFormData(data);
    let cookies = parseCookies();
    let result = await fetch(contract.path, {
      method: "post",
      body: formData,
      headers: {
        // ["Content-Type"]: "multipart/form-data",
        ["Authorization"]: contract.withToken ? `Bearer ${cookies.accessToken}` : undefined
      }
    }).then((res) => res.json());
    return result;
  };
  return fetcher;
}
