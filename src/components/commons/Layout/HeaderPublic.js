import { Badge, Dropdown, Menu, Avatar, Typography } from "antd";
import { ShoppingCartOutlined, UserOutlined, MoreOutlined } from "@ant-design/icons";
import { uniqBy } from "lodash";
import { Cart_GetCart } from "modules/cart/get-cart";
import { useState, useEffect } from "react";
import { destroyCookie } from "nookies";

import useUser from "libs/useUser";
import Link from "components/commons/Link";
import Router from "next/router";

const UserMenu = (mutate) => {
  const handleLogout = async () => {
    await mutate(fetch("/api/auth/signout", { method: "post" }), null);
    localStorage.removeItem("myBag");
    destroyCookie(null, "accessToken");
    await Router.push("/login");
  };
  return (
    <Menu>
      <Menu.Item style={{ minWidth: 200, padding: "8px 20px" }} danger onClick={() => handleLogout()}>
        Sign Out
      </Menu.Item>
    </Menu>
  );
};

export default function Header() {
  const { user, isLoggedIn, mutateUser } = useUser();
  const [counter, setCounter] = useState(0);
  const getQuery = user?.id ? `?user=${user?.id}` : null;
  const cartSWR = Cart_GetCart.swr(getQuery);
  const cartData = cartSWR?.data?.data?.[0];
  const cartItems = cartData?.cartItems || [];
  const cartItemsConstructed = cartItems?.map((i) => ({
    product: i.product.id,
    quantity: i.quantity
  }));
  const ISSERVER = typeof window === "undefined";
  let initial = user?.profile.firstName?.split("")[0] + user?.profile.lastName?.split("")[0] || "";

  let bagItems = [];
  useEffect(() => {
    if (!ISSERVER) {
      localStorage?.setItem("myBag", "[]");
      let merged = [...cartItemsConstructed, ...bagItems];
      merged = uniqBy(merged, "product");
      setCounter(merged.length);
      localStorage?.setItem("myBag", JSON.stringify(merged));
    }
  });

  return (
    <React.Fragment>
      <style jsx>
        {`
          .headerPublic {
            background: #fff;
            height: 74px;
            border-bottom: solid 1px #ededed;
            position: fixed;
            z-index: 20;
            width: 100%;
            top: 0;
          }
          .logo {
            margin-right: 50px;
          }
          .menu li {
            margin: 0 20px;
          }
          .menu li:first-child {
            margin-left: 0;
          }
          .headerPublic :global(.signUpButton) {
            margin-left: 20px;
          }
          .action {
            margin: 0 5px;
            cursor: pointer;
          }
        `}
      </style>
      <div className="headerPublic f mdl">
        <div className="container f f-btw mdl">
          <div className="f mdl">
            <Link href="/">
              <a>
                <img src="/karen-logo.svg" className="logo" />
              </a>
            </Link>
            <ul className="f menu" style={{ margin: 0 }}>
              <li>
                <Link href="/" activeClassName="active">
                  <a className="link">Overview</a>
                </Link>
              </li>
              <li>
                <Link href="/event-overview" activeClassName="active">
                  <a className="link">Event</a>
                </Link>
              </li>
              <li>
                <Link href="/catalog" activeClassName="active">
                  <a className="link">Catalog</a>
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link href="/dashboard" activeClassName="active">
                    <a className="link">Booth</a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="f mdl">
            <Link href="/bag">
              <a className="link" style={{ margin: "0 20px" }}>
                <ShoppingCartOutlined style={{ color: "var(--primaryColor)", marginRight: 5 }} />
                Bag
                {counter !== 0 && <Badge count={counter} style={{ marginLeft: 5 }} />}
              </a>
            </Link>
            {isLoggedIn ? (
              <Dropdown className="action" overlay={UserMenu(mutateUser)} placement="bottomRight">
                <div>
                  <Avatar>{initial}</Avatar>
                  <Typography.Text style={{ margin: "0 10px" }} strong>
                    {user?.profile.firstName} {user?.profile.lastName}
                  </Typography.Text>
                  <MoreOutlined />
                </div>
              </Dropdown>
            ) : (
              <Link href="/login">
                <a className="link">
                  <UserOutlined style={{ color: "var(--primaryColor)", marginRight: 5 }} /> Account
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
