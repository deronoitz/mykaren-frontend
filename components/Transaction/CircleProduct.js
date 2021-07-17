import { Avatar, Typography, Button } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import Product from './Product'

const { Text } = Typography

export default function CircleProductWrapper({ data }) {
  const { circle, products } = data
  return (
    <>
      <div style={{ padding: '20px 0', borderBottom: 'solid 1px #e8e8e8' }} className='f mdl f-btw'>
        <div>
          {/* <Avatar size={46} src='/images/dump/test.png' /> */}
          <Text style={{ marginLeft: 0, fontWeight: 700, color: 'var(--titleColor)' }}><span style={{ fontWeight: 400 }}>by</span> {circle.name}</Text>
        </div>
        <Button type='primary' ghost size='small' style={{ marginLeft: 15 }}>
          <MailOutlined />
          Message circle
        </Button>
      </div>
      {
        products.map(i => <Product key={i.id} data={i}/>)
      }
    </>
  )
}