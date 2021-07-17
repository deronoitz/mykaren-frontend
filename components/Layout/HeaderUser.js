import {
  Avatar,
  Badge,
  Typography,
  Menu,
  Dropdown
} from 'antd'
import { BellOutlined, MoreOutlined } from '@ant-design/icons'
import Link from '../Link/Link'
import { destroyCookie } from "nookies"
import useUser from "lib/useUser"
import Router from "next/router"

const UserMenu = (mutate) => {
  const handleLogout = async () => {
    await mutate(
      fetch("/api/auth/signout", { method: "post" }), null
    )
    localStorage.removeItem('myBag')
    destroyCookie(null, 'accessToken')
    await Router.push("/login")
  }
  return (
    <Menu>
      <Menu.Item style={{ minWidth: 200, padding: '8px 20px' }}>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          Account Settings
    </a>
      </Menu.Item>
      <Menu.Item style={{ minWidth: 200, padding: '8px 20px' }}>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          Help
    </a>
      </Menu.Item>
      <Menu.Item
        style={{ minWidth: 200, padding: '8px 20px' }}
        danger
        onClick={() => handleLogout()}
      >
        Sign Out
    </Menu.Item>
    </Menu>
  )
}

export default function Header() {
  let { user: data, mutateUser } = useUser()
  let user = data?.profile
  let initial = user?.firstName?.split("")[0] + user?.lastName?.split("")[0] || ""
  return (
    <React.Fragment>
      <style jsx>
        {`
          .headerPublic {
            background: #fff;
            height: 74px;
            border-bottom: solid 1px #ededed;
            position: fixed;
            z-index: 999;
            width: 100%;
            top: 0;
          }
          .logo {
            margin-right: 30px
          }
          .menu li {
            margin: 0 20px;
          }
          .headerPublic :global(.signUpButton) {
            margin-left: 20px;
          }
          .action {
            margin: 0 15px;
            cursor: pointer
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
                <Link href="/event-overview" activeClassName="active">
                  <a className="link">Event</a>
                </Link>
              </li>
              <li>
                <Link href="/catalog" activeClassName="active">
                  <a className="link">Catalog</a>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" activeClassName="active">
                  <a className="link">Booth</a>
                </Link>
              </li>

              {/* <li>
                <Link href="/circle" activeClassName="active">
                  <a className="link">Booth</a>
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="f mdl">
            {/* <div className="action">
              <Badge count={7}>
                <a>
                  <BellOutlined style={{ fontSize: 18 }} />
                </a>
              </Badge>
            </div> */}
            <Dropdown className="action" overlay={UserMenu(mutateUser)} placement="bottomRight">
              <div>
                <Avatar>{initial}</Avatar>
                <Typography.Text style={{ margin: "0 10px" }} strong>
                  {user?.firstName} {user?.lastName}
                </Typography.Text>
                <MoreOutlined />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}
