import * as yup from 'yup'
import { fetcherWithBody } from 'modules/fetcher'
import { swrWithInput } from 'modules/swr'

const schema = yup.object().shape({
  code: yup.string().trim().required(),
  circle: yup.string().required(),
  created_by: yup.string(),
  updated_by: yup.string()
})

const contract = {
  path: '/api/invite/create-code',
  method: 'post',
  schema
}

const fetcher = fetcherWithBody(contract)
const swr = (key, options) => swrWithInput(contract, fetcher, options, key)

export const Invite__CreateCode = {
  contract,
  fetcher,
  swr,
  schema
}
