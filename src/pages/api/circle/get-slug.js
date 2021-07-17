import { apiWrapper } from "modules/apiWrapper";
import { withSession } from "libs/session";
import { Circle__SlugContract } from "modules/circle/get-slug";

export default withSession(
  apiWrapper(Circle__SlugContract.contract.method, async (req, res) => {
    const user = req.session.get("karen-user-data");
    const isExist = await fetch(`${process.env.API_URL}/circles?url=${req.body.slug}`, {
      method: "get",
      headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: `Bearer ${user.jwt}`
      }
    })
      .then((res) => res.json())
      .catch((err) => err);
    console.log();
    if (isExist.statusCode >= 400) {
      throw new Error(isExist.message);
    } else {
      return isExist.length > 0 ? false : true;
    }
  })
);
