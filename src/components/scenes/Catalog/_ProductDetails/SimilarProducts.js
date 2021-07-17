import { Typography } from 'antd'
import CardWrapper from 'components/_Catalog/CardWrapper'
const { Title } = Typography
export default function SimilarProducts() {
  return (
    <div>
      <div className='container f f-btw mdl' style={{padding: '56px 0 0', borderTop: 'solid 1px #e8e8e8'}}>
        <Title level={3} style={{ fontWeight: 500 }}>You may also like</Title>
      </div>
      <CardWrapper />
    </div>
  )
}