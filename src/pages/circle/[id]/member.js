import { useEffect } from "react";
import { withSession } from "libs/session";

import CircleLayout from "components/commons/Layout/CircleLayout";
import Member from "components/scenes/Circle/Member";
import Context from "hooks/circle";

export default function MemberPage(props) {
  useEffect(() => {
    document.title = `${props.circle?.name} Member | MyKaren`;
  });
  return (
    <CircleLayout>
      <Context.Provider initialState={props.circle}>
        <Member />
      </Context.Provider>
    </CircleLayout>
  );
}

export const getServerSideProps = withSession(async ({ req, res, query }) => {
  const user = req.session.get("karen-user-data");
  const { id } = query;
  let circle;
  if (res) {
    if (!user) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    } else {
      circle = await fetch(`${process.env.API_URL}/circles?url=${id}&members=${user.user.id}`, {
        method: "get",
        headers: {
          ["Content-Type"]: "application/json",
          ["Authorization"]: `Bearer ${user.jwt}`
        }
      }).then((res) => res.json());
      if (circle.length === 0) {
        res.writeHead(301, { Location: "/dashboard" });
        res.end();
      }
    }
  }
  return {
    props: {
      circle: circle[0]
    }
  };
});
