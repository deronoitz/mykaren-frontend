import { fetcherWithBodyNotJson } from 'modules/fetcher'
import { swrWithInput } from 'modules/swr'
const contract = {
  // path: '/api/cart/delete',
  path: process.env.NEXT_PUBLIC_API_URL + '/carts/remove',
  method: 'post',
  withToken: true
}

const fetcher = fetcherWithBodyNotJson(contract)
const swr = (key, options) => swrWithInput(contract, fetcher, options, key)

export const Cart_DeleteItem = {
  contract,
  fetcher,
  swr
} 