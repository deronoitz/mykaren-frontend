import { apiWrapper } from 'modules/apiWrapper'
import { Invite__GetActive } from 'modules/invite/get-active-code'
import { parseCookies } from 'nookies'

export default apiWrapper(
  Invite__GetActive.contract.method,
  async (req, res) => {
    const { accessToken } = parseCookies({ req })
    const { circle } = req.query
    const query = `?circle=${circle}`
    const inviteCode = await fetch(`${process.env.API_URL}/invite-codes${query}`, {
      method: 'get',
      headers: {
        ['Authorization']: `Bearer ${accessToken}`
      }
    })
    .then(res => res.json())
    .catch(err => err)

    if (inviteCode.statusCode >= 400) {
      throw new Error(inviteCode.message)
    } else {
      return inviteCode
    }
  }
)