import * as yup from "yup"
import { fetcherWithBody } from "../fetcher"

const schema = yup.object().shape({
  email: yup.string().email().trim().required(),
  password: yup.string().required(),
  remember: yup.boolean()
})

const contract = {
  path: "api/auth/signin",
  method: "post",
  withToken: false,
  schema
}

const fetcher = fetcherWithBody(contract)

const User__SignContract = {
  schema,
  contract,
  fetcher
}

export default User__SignContract