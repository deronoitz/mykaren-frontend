import * as yup from 'yup'
import { fetcherWithBody } from 'modules/fetcher'
import { swrWithInput } from 'modules/swr'

const schema = yup.object().shape({
  code: yup.string().trim().required(),
  email: yup.string().email().required(),
})

const contract = {
  path: '/api/invite/send-invitation',
  method: 'post',
  schema
}

const fetcher = fetcherWithBody(contract)
const swr = (key, options) => swrWithInput(contract, fetcher, options, key)

export const Invite__SendEmail = {
  contract,
  fetcher,
  swr,
  schema
}
