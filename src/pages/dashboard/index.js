import { useEffect } from "react";
import { withSession } from "libs/session";
import { Typography } from "antd";

import AppLayout from "components/Layout/UserLayout";
import CircleWrapper from "components/_Circle/CircleWrapper";

export default function Dashboard(props) {
  useEffect(() => {
    document.title = "Dashboard | MyKaren";
  });
  return (
    <AppLayout>
      <div style={{ paddingLeft: 57, width: "100%" }}>
        <Typography.Title level={4}>My Booth</Typography.Title>
        <CircleWrapper />
      </div>
    </AppLayout>
  );
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get("karen-user-data");
  if (res) {
    if (!user) {
      try {
        res.writeHead(302, { Location: "/login" });
        res.end();
      } catch {
        console.log("ERROR");
      }
    }
  }
  return {
    props: {}
  };
});
