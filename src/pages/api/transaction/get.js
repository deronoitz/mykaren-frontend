import { apiWrapper } from "modules/apiWrapper"
import { Transaction_Get } from "modules/transaction/get-transaction"
import { parseCookies } from 'nookies'
import qs from 'query-string'
export default apiWrapper(
  Transaction_Get.contract.method,
  async (req, res) => {
    const { accessToken } = parseCookies({ req });
    const query = '?' + qs.stringify(req.query)
    const transactions = await fetch(`${process.env.API_URL}/transactions${query}`, {
      method: 'get',
      headers: {
        ['Authorization']: `Bearer ${accessToken}`
      }
    }).then(res => res.json()).catch(err => err)
    if (transactions.statusCode >= 400) {
      throw new Error(transactions.message)
    } else {
      return transactions
    }
  }
)