import { fetcherGet } from "../fetcher"
import { swrGet } from "../swr"

const contract = {
  path: "/api/auth/me",
  method: "get",
  withToken: false
}

const fetcher = fetcherGet(contract)
const swr = options => swrGet(contract, fetcher, options)

export const User__MeContract = {
  contract,
  fetcher,
  swr
}