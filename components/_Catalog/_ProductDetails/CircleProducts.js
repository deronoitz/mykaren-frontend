import { Typography } from 'antd'
import CardWrapper from 'components/_Catalog/CardWrapper'
import Context from 'hooks/product-details'
import { Product__GetCatalog } from 'modules/product/get-catalog'
import qs from 'query-string'
const { Title } = Typography
export default function CircleProducts() {
  const { data } = Context.useContainer();
  const product = data?.[0];
  const query = qs.stringify({
    circle: product?.circle.id,
    _limit: 4
  })
  const productSWR = product && Product__GetCatalog.swr('?' + query, { refreshInterval: 0 })
  const products = productSWR?.data?.data

  return (
    <div>
      <div className='container f f-btw mdl' style={{padding: '56px 0 0', borderTop: 'solid 1px #e8e8e8'}}>
        <Title level={3} style={{ fontWeight: 500 }}>Another product from <span style={{ color: 'var(--primaryColor)', fontWeight: 700 }}>{product?.circle.name}</span></Title>
        {/* <a style={{fontSize: 16, fontWeight: 500}}>View all</a> */}
      </div>
      <CardWrapper data={products}/>
    </div>
  )
}