import { Avatar, Typography } from 'antd'
const { Text } = Typography

export default function Product({ data }) {
  return (
    <div className='f mdl f-btw product'>
      <style jsx>
        {`
          .product {
            margin: 26px 0;
          }
        `}
      </style>
      <div className='f mdl'>
        <Avatar size={60} src={data.product.images?.[0]?.formats.thumbnail.url} shape='square' style={{ marginRight: 22 }} />
        <div className='f f-c'>
          <Text style={{ fontSize: 16, color: 'var(--titleColor)' }}>{data.product.name}</Text>
          <Text style={{ fontSize: 12, color: 'var(--contentColor)' }}>{data.quantity} Items </Text>
        </div>
      </div>
      <Text style={{ color: 'var(--contentColor)' }}>
        Sub-Total:&nbsp;
      <span style={{ fontWeight: 500, color: 'var(--titleColor)' }}>Rp. {new Intl.NumberFormat(['ban', 'id']).format(data.price * data.quantity)}</span>
      </Text>
    </div>
  )
}