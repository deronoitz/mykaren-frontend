import { apiWrapper } from "modules/apiWrapper";
import { withSession } from "libs/session";
import { Circle__CreateContract } from "modules/circle/create";

export default withSession(
  apiWrapper(Circle__CreateContract.contract.method, async (req, res) => {
    const user = req.session.get("karen-user-data");
    const createCircle = await fetch(`${process.env.API_URL}/circles`, {
      method: "post",
      body: req.body,
      headers: {
        ["Content-Type"]: req.headers["content-type"],
        ["Authorization"]: `Bearer ${user.jwt}`
      }
    })
      .then((res) => res.json())
      .catch((err) => err);

    if (createCircle.statusCode >= 400) {
      throw new Error(createCircle.message);
    } else {
      return createCircle;
    }
  })
);
