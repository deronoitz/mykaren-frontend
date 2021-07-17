import { fetcherWithParams } from 'modules/fetcher'
import { swrWithInput } from 'modules/swr'

const contract = {
  path: '/api/product/get-catalog',
  method: 'get',
  withToken: false
}

const fetcher = fetcherWithParams(contract)
const swr = (key, options) => swrWithInput(contract, fetcher, options, key)

export const Product__GetCatalog = {
  contract,
  fetcher,
  swr
}