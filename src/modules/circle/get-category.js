import { fetcherGet } from 'modules/fetcher'
import { swrGet } from 'modules/swr'
const contract = {
  path: '/api/circle/get-category',
  method: 'get',
  withToken: false
}

const fetcher = fetcherGet(contract)
const swr = options => swrGet(contract, fetcher, options)

export const Circle__GetCategory = {
  contract,
  fetcher,
  swr
}