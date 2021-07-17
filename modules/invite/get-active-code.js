import { fetcherWithParams } from 'modules/fetcher'
import { swrGet } from 'modules/swr'

const contract = {
  path: '/api/invite/get-active-code',
  method: 'get',
}

const fetcher = fetcherWithParams(contract)
const swr = (key, options) => swrGet(contract, fetcher, options, key)

export const Invite__GetActive = {
  contract,
  fetcher,
  swr
}
