import * as yup from 'yup'
import { fetcherUpload } from 'modules/fetcher'
import { swrWithInput } from 'modules/swr'

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  description: yup.string(),
  isPersonal: yup.boolean(),
  rating: yup.string(),
  price: yup.number().required(),
  stock: yup.number(),
  isPublished: yup.boolean(),
  tags: yup.array(),
  artist: yup.array(),
  category: yup.string(),
  images: yup.mixed()
})

const contract = {
  // path: '/api/product/create',
  path: process.env.NEXT_PUBLIC_API_URL + '/product-circles',
  method: 'post',
  withToken: true,
  schema
}

const fetcher = fetcherUpload(contract)
const swr = options => swrWithInput(contract, fetcher, options)

export const Product__CreateContract = {
  schema,
  contract,
  fetcher,
  swr
}