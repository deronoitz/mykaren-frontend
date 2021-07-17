import { fetcherWithBody } from "./fetcher"
import { swrWithInput } from "./swr"

const contract = {
  path: "api/recaptcha-validation",
  method: "post",
  withToken: false,
}

const fetcher = fetcherWithBody(contract)
const swr = options => swrWithInput(contract, fetcher, options)

const Recaptcha__Contract = {
  contract,
  fetcher,
  swr
}

export default Recaptcha__Contract