import { fetcherWithParams } from 'modules/fetcher'
import { swrWithInput } from 'modules/swr'

const contract = {
  path: '/api/product/get-product',
  method: 'get',
  withToken: false
}

const fetcher = fetcherWithParams(contract)
const swr = (key, options) => swrWithInput(contract, fetcher, options, key)

export const Product__GetProduct = {
  contract,
  fetcher,
  swr
}