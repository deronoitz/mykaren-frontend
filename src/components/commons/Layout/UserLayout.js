import { Transaction_Get } from "modules/transaction/get-transaction";

import Header from "./HeaderPublic";
import Sidemenu from "components/commons/Sidemenu";
import useUser from "libs/useUser";
import qs from "query-string";

export default function UserLayout({ children }) {
  const { user } = useUser();
  const query = qs.stringify({
    user: user?.id,
    status: "waiting-for-payment"
  });
  const TransactionSWR = Transaction_Get.swr(`?${query}`);
  const counter = TransactionSWR.data?.data?.length;
  const menu = [
    {
      title: "WORKSPACE",
      menu: [
        {
          title: "My Booth",
          link: "/dashboard",
          icon: ""
        },
        {
          title: "My Order",
          link: "/transaction",
          icon: "",
          count: counter
        },
        {
          title: "Activity",
          link: "/activity",
          icon: ""
        }
      ]
    }
  ];

  return (
    <React.Fragment>
      <div
        style={{
          // background: '#f9f9f9',
          minHeight: "100vh",
          backgroundImage: "url(/images/bg-overlay.svg)",
          backgroundPosition: "bottom",
          backgroundSize: "cover"
        }}
      >
        <Header />
        <div style={{ marginTop: 75 }} />
        <div className="container">
          {/* <Breadcrumb /> */}
          <div className="f" style={{ paddingTop: 30 }}>
            <Sidemenu data={menu} />
            {children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
