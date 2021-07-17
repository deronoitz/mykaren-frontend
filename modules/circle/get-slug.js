import { fetcherWithBody } from "modules/fetcher"
import { swrWithInput } from "modules/swr"

const contract = {
  path: '/api/circle/get-slug',
  method: 'post'
}

const fetcher = fetcherWithBody(contract)
const swr = options => swrWithInput(contract, fetcher, options)

export const Circle__SlugContract = {
  contract,
  fetcher,
  swr
}
