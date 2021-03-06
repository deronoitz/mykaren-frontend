import { useEffect } from "react";
import { withSession } from "libs/session";
import { Typography } from "antd";

import AppLayout from "components/commons/Layout/UserLayout";
import TransactionWrapper from "components/commons/Transaction/Wrapper";
import qs from "query-string";

export default function Transaction(props) {
  const { user } = props.user;
  const query = qs.stringify({
    user: user?.id,
    _sort: "updatedAt:desc"
  });
  useEffect(() => {
    document.title = "Dashboard | MyKaren";
  });

  return (
    <AppLayout>
      <div style={{ paddingLeft: 57, width: "100%" }}>
        <Typography.Title level={4}>My Order</Typography.Title>
        <TransactionWrapper query={query} />
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
    props: {
      user
    }
  };
});
