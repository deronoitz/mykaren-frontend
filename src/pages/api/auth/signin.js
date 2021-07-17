import User__SignContract from "modules/user/signIn";

import { setAuthCookies } from "modules/user/setAuthCookies";
import { apiWrapper } from "modules/apiWrapper";
import { withSession } from "libs/session";

export default withSession(
  apiWrapper(User__SignContract.contract.method, async (req, res) => {
    let { email, password, remember } = await User__SignContract.schema.validate(req.body);
    let user = await fetch(`${process.env.API_URL}/auth/local`, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: new URLSearchParams({
        identifier: `${email}`,
        password: `${password}`
      })
    })
      .then((res) => res.json())
      .catch((err) => err);
    if (user) {
      if (user.statusCode >= 400) {
        throw new Error(user.message[0].messages[0].message);
      } else {
        setAuthCookies(res, { accessToken: user.jwt });
        req.session.set("karen-user-data", user);
        await req.session.save();
        return user;
      }
    } else {
      throw new Error("Email/Password is not correct");
    }
  })
);
