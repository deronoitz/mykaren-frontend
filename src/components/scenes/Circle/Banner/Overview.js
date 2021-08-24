
import {
  Typography,
  Avatar,
  Dropdown,
  Menu,
} from 'antd'
import {
  UserOutlined,
  EditOutlined,
} from '@ant-design/icons'
import Context from "hooks/circle"

const { Title } = Typography

const bannerMenu = (
  <Menu>
    <Menu.Item>Change banner image</Menu.Item>
  </Menu>
)

export default function BannerOverview() {
  const { data: circle } = Context.useContainer()
  return (
    <div className="banner">
      <style jsx>
        {`
          .banner {
            height: 205px;
            border-radius: 16px;
            background: #000;
            padding: 26px 38px;
            position: relative;
          }
          .img {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: 16px;
            position: absolute;
            opacity: .5;
            object-fit: cover;
          }
        `}
      </style>
      <div style={{zIndex: 1}}>
        <img
          className="img"
          src={circle.banner?.formats.medium.url}
        />
      </div>
      <div className="f mdl" style={{zIndex: 2, position: 'relative', height: '100%'}}>
        <Avatar
          size={100}
          icon={<UserOutlined />}
          src={circle.profilePicture?.formats.thumbnail.url}
          style={{ marginRight: 28 }}
        />
        <Title level={2} style={{ color: '#fff', margin: 0, fontWeight: 700 }}>{circle.name}</Title>
        <Dropdown overlay={bannerMenu}>
          <EditOutlined style={{ color: '#fff', fontSize: 20, position: 'absolute', top: 0, right: 0 }} />
        </Dropdown>
      </div>
    </div>
  )
}