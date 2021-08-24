import { fetcherWithBody } from 'modules/fetcher'
import { swrWithInput } from 'modules/swr'
const contract = {
  // path: '/api/transaction/create',
  path: process.env.NEXT_PUBLIC_API_URL + '/transactions',
  method: 'post',
  withToken: true
}

const fetcher = fetcherWithBody(contract)
const swr = (key, options) => swrWithInput(contract, fetcher, options, key)

export const Transaction_Create = {
  contract,
  fetcher,
  swr
}