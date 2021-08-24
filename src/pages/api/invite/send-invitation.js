import { apiWrapper } from 'modules/apiWrapper'
import { Invite__SendEmail } from 'modules/invite/send-invitation'
import { parseCookies } from 'nookies'

export default apiWrapper(
  Invite__SendEmail.contract.method,
  async (req, res) => {
    const { accessToken } = parseCookies({ req })
    const sendEmail = await fetch(`${process.env.API_URL}/invite-codes/send-invitation`, {
      method: 'post',
      body: JSON.stringify(req.body),
      headers: {
        ["Content-Type"]: "application/json",
        ['Authorization']: `Bearer ${accessToken}`
      }
    }).then(res => res.json()).catch(err => err)
    if(sendEmail.statusCode >= 400){
      throw new Error(sendEmail.message)
    } else {
      return sendEmail
    }
  }
)