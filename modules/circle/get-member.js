import { fetcherWithParams } from 'modules/fetcher'
import { swrWithInput } from 'modules/swr'
const contract = {
  path: '/api/circle/get-member',
  method: 'get',
  withToken: false
}

const fetcher = fetcherWithParams(contract)
const swr = (key, options) => swrWithInput(contract, fetcher, options, key)

export const Circle__GetMember = {
  contract,
  fetcher,
  swr
}