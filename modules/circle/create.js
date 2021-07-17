import * as yup from "yup"
import { fetcherUpload } from "modules/fetcher"
import { swrWithInput } from "modules/swr"

const schema = yup.object().shape({
  owner: yup.string(),
  name: yup.string().trim(),
  profilePicture: yup.mixed(),
  banner: yup.mixed(),
  category: yup.array(), 
  description: yup.string(),
  tags: yup.array(),
  url: yup.string().trim().required(),
  socmed: yup.object(),
  website: yup.string(),
  // website: yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Please insert correct URL format!'),
})

const contract = {
  path: process.env.NEXT_PUBLIC_API_URL + '/circles',
  // path: '/api/circle/create-circle',
  method: 'post',
  withToken: true,
  schema
} 

const fetcher = fetcherUpload(contract)
const swr = options => swrWithInput(contract, fetcher, options)

export const Circle__CreateContract = {
  contract,
  schema,
  fetcher,
  swr
}
