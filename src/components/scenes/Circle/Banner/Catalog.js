import {
  Avatar, Typography, Button
} from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import Context from 'hooks/circle'
import { useRouter } from 'next/router'
const { Title, Text } = Typography

export default function BannerCatalog() {
  const { data: circle } = Context.useContainer()
  const router = useRouter()
  const published = circle.products.filter(i => i.isPublished).length
  const outOfStock = circle.products.filter(i => i.stock === 0).length
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
      <div style={{ zIndex: 1 }}>
        <img
          className="img"
          src={circle.banner?.formats.medium.url}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 2, height: '100%' }} className='f f-btw mdl'>
        <div className="f mdl" >
          <Avatar size={100} icon={<UserOutlined />} src={circle.profilePicture?.formats?.thumbnail?.url} style={{ marginRight: 28 }} />
          <div>
            <Title level={2} style={{ color: '#fff', margin: 0, fontWeight: 700 }}>{circle.name}</Title>
            <Text style={{ color: "#fff" }}>{circle.products.length} Products | {published} Published | {outOfStock} Out of Stock</Text>
          </div>
        </div>
        <Button ghost onClick={() => router.push(`/product/add-product?circle=${router.query.id}`)}>
          <PlusOutlined />
          Add Product
        </Button>
      </div>

    </div>
  )
}