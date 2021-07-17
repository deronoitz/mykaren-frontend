import { fetcherWithBodyNotJson } from 'modules/fetcher'
import { swrWithInput } from 'modules/swr'
const contract = {
  // path: '/api/cart/add',
  path: process.env.NEXT_PUBLIC_API_URL + '/carts',
  method: 'post',
  withToken: true
}

const fetcher = fetcherWithBodyNotJson(contract)
const swr = (key, options) => swrWithInput(contract, fetcher, options, key)

export const Cart_AddItem = {
  contract,
  fetcher,
  swr
}