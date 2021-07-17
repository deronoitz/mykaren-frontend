import { apiWrapper } from "modules/apiWrapper";
import { withSession } from "libs/session";
import { Circle__GetContract } from "modules/circle/get";

export default withSession(
  apiWrapper(Circle__GetContract.contract.method, async (req, res) => {
    const user = req.session.get("karen-user-data");
    const { circle } = req.query;
    // const query = `_where[_or][0][0][owner]=${user.user.id}&_where[_or][0][1][members]=${user.user.id}&_where[_or][0][2][url]=${circle}`
    const query = `_where[_or][0][1][members]=${user.user.id}&_where[_or][0][2][url]=${circle}`;
    const member = await fetch(`${process.env.API_URL}/circles?${query}`, {
      method: "get",
      headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: `Bearer ${user.jwt}`
      }
    }).then((res) => res.json());
    if (member) {
      const account = member[0].members;
      const profileQuery = account?.map((i) => `user=${i.id}`).join("&");
      const userProfile = await fetch(`${process.env.API_URL}/user-profiles?${profileQuery}`, {
        headers: {
          ["Content-Type"]: "application/json",
          ["Authorization"]: `Bearer ${user.jwt}`
        }
      }).then((res) => res.json());
      return userProfile;
    } else {
      throw new Error("error");
    }
  })
);
