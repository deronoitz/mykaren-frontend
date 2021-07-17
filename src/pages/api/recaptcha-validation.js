import { apiWrapper } from "modules/apiWrapper"
import Recaptcha__Contract from "modules/recaptcha"

export default apiWrapper(
  Recaptcha__Contract.contract.method,
  async (req, res) => {
    const RECAPTCHA_SERVER_KEY = process.env.RECAPTCHA_SERVER_KEY
    const humanKey = req.body.key
    const isHuman = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: `secret=${RECAPTCHA_SERVER_KEY}&response=${humanKey}`
    })
      .then(res => res.json())
      .then(json => json.success)
      .catch(err => {
        throw new Error(`Error in Google Siteverify API. ${err.message}`)
      })

    if (humanKey === null || !isHuman) {
      throw new Error(`YOU ARE NOT A HUMAN.`)
    }
  }
)