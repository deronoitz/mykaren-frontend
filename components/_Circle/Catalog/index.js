import ProductCard from "components/ProductCard"
import Context from 'hooks/circle'
import Banner from '../Banner/Catalog'
import { Menu, Button } from "antd"
import { uniq } from 'lodash'
import { Product__GetCategory } from 'modules/product/get-category'
import { Product__GetProduct } from 'modules/product/get-product'

export default function Catalog() {
  const { data: circle } = Context.useContainer()
  const categorySWR = Product__GetCategory.swr()
  const productSWR = Product__GetProduct.swr(`?circle=${circle.id}`)
  const category = categorySWR?.data?.data
  const products = productSWR?.data?.data
  let menuData = uniq(circle.products?.map(i => category?.filter(n => i.category === n.id)[0]))
  menuData = menuData.filter(i => i !== undefined)
  return (
    <>
      <Banner />
      <div className='f mdl' style={{ marginTop: 20 }}>
        <Button size='small' type='primary'>All Products</Button>
        {
          menuData.map(i =>
            <Button size='small' key={i.id} style={{marginLeft: 10}}>
              {i.name}
            </Button>
          )
        }
      </div>
      <div className="f f-w" style={{ padding: "25px 0", margin: "0 -10px" }}>
        {
          products && products.map(i =>
            <ProductCard key={i.id} data={i} />
          )
        }
        {
          !products && 'Loading...'
        }
      </div>
    </>
  )
}