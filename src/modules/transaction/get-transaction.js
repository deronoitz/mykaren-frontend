import { fetcherWithParams } from 'modules/fetcher'
import { swrGet } from 'modules/swr'
const contract = {
  path: '/api/transaction/get',
  method: 'get',
  withToken: true
}

const fetcher = fetcherWithParams(contract)
const swr = (key, options) => swrGet(contract, fetcher, options, key)

export const Transaction_Get = {
  contract,
  fetcher,
  swr
}