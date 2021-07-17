import { fetcherUpload } from 'modules/fetcher'
import { swrWithInput } from 'modules/swr'

export const contract = {
  method: 'post',
  path: '/api/upload/circle-avatar',
  withToken: true
}

export const fetcher = fetcherUpload(contract)
export const swr = options => swrWithInput(contract, fetcher, options)

export const Upload__CircleAvatarContract = {
  contract,
  fetcher,
  swr
}