import { apiWrapper } from "modules/apiWrapper";
import { withSession } from "libs/session";
import { Circle__GetContract } from "modules/circle/get";

export default withSession(
  apiWrapper(Circle__GetContract.contract.method, async (req, res) => {
    const user = req.session.get("karen-user-data");
    const query = `_where[_or][0][owner]=${user.user.id}&_where[_or][1][members]=${user.user.id}`;

    const circle = await fetch(`${process.env.API_URL}/circles?${query}`, {
      method: "get",
      headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: `Bearer ${user.jwt}`
      }
    }).then((res) => res.json());

    if (circle) {
      return circle;
    } else {
      throw new Error("error");
    }
  })
);
