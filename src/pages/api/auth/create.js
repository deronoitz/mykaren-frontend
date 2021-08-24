import User__CreateContract from "modules/user/create"
import { apiWrapper } from "modules/apiWrapper"
export default apiWrapper(
  User__CreateContract.contract.method,
  async (req, res) => {
    let {
      firstName,
      lastName,
      email,
      username,
      password,
      phoneNumber,
      nis
    } = await User__CreateContract.schema.validate(req.body)

    const isExist = await fetch(`${process.env.API_URL}/auth/check/user`, {
      method: 'post',
      body: JSON.stringify({
        email
      }),
      headers: {
        ["Content-Type"]: "application/json",
      }
    }).then(res => {
      if(res.status >= 400){
        return res.json()
      } else {
        return res.status
      }
    }).catch(err => err)
    if (isExist === 200) {
      let userAccount = await fetch(`${process.env.API_URL}/auth/local/register`, {
        method: "post",
        body: JSON.stringify({
          email,
          username,
          password,
          userProfile: {
            firstName,
            lastName,
            phoneNumber,
            nis,
          },
          confirmed: false
        }),
        headers: {
          ["Content-Type"]: "application/json",
        },
      })
        .then((res) => res.json())
        .catch(err => err);

      return userAccount
    } else if (isExist.statusCode >= 400) {
      throw new Error(isExist.message)
    }
  }
)