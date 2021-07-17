import { useEffect } from "react";
import { CreateProductContext } from "hooks/create-product";
import { withSession } from "libs/session";

import AddProduct from "components/_Product/AddProduct";
import AppLayout from "components/Layout/FormLayout";

export default function AddProductPage(props) {
  useEffect(() => {
    document.title = "Add Product | MyKaren";
  });
  return (
    <AppLayout>
      <CreateProductContext.Provider>
        <AddProduct circleData={props.circle} />
      </CreateProductContext.Provider>
    </AppLayout>
  );
}

export const getServerSideProps = withSession(async ({ req, res, query }) => {
  const user = req.session.get("karen-user-data");
  const { circle: id } = query;
  let circle;
  if (res) {
    if (!user) {
      res.writeHead(302, { Location: "/dashboard" });
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
