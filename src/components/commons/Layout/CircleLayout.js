import { useRouter } from "next/router"
import HeaderUser from './HeaderPublic'
import Sidemenu from "../Sidemenu/Sidemenu"
import {
  AppstoreOutlined,
  StarOutlined,
  CarryOutOutlined,
  UserOutlined,
  SettingOutlined,
  ShopOutlined
} from '@ant-design/icons'

const menu = (id) => [
  {
    title: 'BOOTH SPACE',
    menu: [
      {
        title: 'Overview',
        link: `/circle/${id}`,
        icon: <AppstoreOutlined />
      },
      {
        title: 'Order',
        link: `/circle/${id}/order`,
        icon: <ShopOutlined />,
        count: 4
      },
    ]
  },
  {
    title: 'MAIN MENU',
    menu: [
      {
        title: 'Product',
        link: `/circle/${id}/catalog`,
        icon: <StarOutlined />
      },
      {
        title: 'Event',
        link: `/circle/${id}/event`,
        icon: <CarryOutOutlined />
      },
      {
        title: 'Member',
        link: `/circle/${id}/member`,
        icon: <UserOutlined />
      },
      {
        title: 'Settings',
        link: `/circle/${id}/settings`,
        icon: <SettingOutlined />
      },
    ]
  }
]

const CircleLayout = props => {
  const router = useRouter();
  const { id } = router.query
  return (
    <React.Fragment>
      <div
        style={{
          minHeight: '100vh',
          backgroundImage: 'url(/images/bg-overlay.svg)',
          backgroundPosition: 'bottom',
          backgroundSize: 'cover'
        }}
      >
        <HeaderUser />
        <div style={{ marginTop: 75 }} />
        <div className="container">
          <div className="f" style={{ paddingTop: 30 }}>
            <Sidemenu data={menu(id)} noAction/>
            <div style={{ paddingLeft: 57, width: '100%' }}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CircleLayout