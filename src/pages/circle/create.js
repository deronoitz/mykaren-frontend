import { useEffect } from "react";
import { withSession } from "libs/session";

import AppLayout from "components/commons/Layout/FormLayout";
import CreateCircle from "components/commons/CreateCircle/CreateCircle";

export default function Create() {
  useEffect(() => {
    document.title = "Create Circle | MyKaren";
  });
  return (
    <AppLayout>
      <CreateCircle />
    </AppLayout>
  );
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get("karen-user-data");
  if (res) {
    if (!user) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    }
  }
  return {
    props: {}
  };
});
