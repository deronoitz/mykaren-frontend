import { fetcherGet } from "modules/fetcher"
import { swrGet } from "modules/swr"
const contract = {
  path: 'api/circle/get-circle',
  method: 'get',
  withToken: true
}
const fetcher = fetcherGet(contract)
const swr = options => swrGet(contract, fetcher, options)

export const Circle__GetContract = {
  contract,
  fetcher,
  swr
}
