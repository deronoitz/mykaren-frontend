import { fetcherWithParams } from "modules/fetcher";
import { swrGet } from "modules/swr";
const contract = {
  path: "/api/cart/get",
  method: "get",
  withToken: true
};

const fetcher = fetcherWithParams(contract);
const swr = (key, options) => key && swrGet(contract, fetcher, options, key);

export const Cart_GetCart = {
  contract,
  fetcher,
  swr
};
