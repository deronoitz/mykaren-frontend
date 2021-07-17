import { apiWrapper } from 'modules/apiWrapper'
import { Invite__CreateCode } from 'modules/invite/create-code'
import { parseCookies } from 'nookies'

export default apiWrapper(
  Invite__CreateCode.contract.method,
  async (req, res) => {
    const { accessToken } = parseCookies({ req })
    // const data = Invite__CreateCode.schema.validate(req.body)
    const inviteCode = await fetch(`${process.env.API_URL}/invite-codes`, {
      method: 'post',
      body: JSON.stringify(req.body),
      headers: {
        ["Content-Type"]: "application/json",
        ['Authorization']: `Bearer ${accessToken}`
      }
    }).then(res => res.json()).catch(err => err)
    if(inviteCode.statusCode >= 400){
      throw new Error(inviteCode.message)
    } else {
      return inviteCode
    }
  }
)