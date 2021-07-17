import { withSession } from "lib/session"
import { destroyCookie  } from 'nookies'
export default withSession(async (req, res) => {
  await req.session.destroy()
  destroyCookie({ res }, 'accessToken')
  await res.send("Logget out")
})