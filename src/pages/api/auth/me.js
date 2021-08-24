import { apiWrapper } from "modules/apiWrapper";
import { withSession } from "libs/session";
import { User__MeContract } from "modules/user/me";

export default withSession(
  apiWrapper(User__MeContract.contract.method, async (req, res) => {
    const user = req.session.get("karen-user-data");
    if (user) {
      return {
        isLoggedIn: true,
        ...user
      };
    } else {
      return {
        isLoggedIn: false
      };
    }
  })
);
