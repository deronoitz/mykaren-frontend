import { apiWrapper } from 'modules/apiWrapper'
import { Transaction_Create } from 'modules/transaction/create-transaction'
import { parseCookies } from 'nookies'

export default apiWrapper(
  Transaction_Create.contract.method,
  async (req, res) => {
    const { accessToken } = parseCookies({ req });
    const transaction = await fetch(`${process.env.API_URL}/transactions`, {
      method: 'post',
      body: req.body,
      headers: {
        ["Authorization"]: `Bearer ${accessToken}`
      }
    }).then(res => res.json()).catch(err => err)

    if (transaction.statusCode >= 400) {
      throw new Error(transaction.message)
    } else {
      return transaction
    }
  }
)
