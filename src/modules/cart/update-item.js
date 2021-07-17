import { fetcherWithParamsBody } from 'modules/fetcher'
import { swrWithInput } from 'modules/swr'
const contract = {
  // path: '/api/cart/add',
  path: process.env.NEXT_PUBLIC_API_URL + '/carts',
  method: 'put',
  withToken: true
}

const fetcher = fetcherWithParamsBody(contract)
const swr = (key, options) => swrWithInput(contract, fetcher, options, key)

export const Cart_UpdateItem = {
  contract,
  fetcher,
  swr
}