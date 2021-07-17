import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { LoadingOutlined } from '@ant-design/icons'
import { Cart_GetCart } from 'modules/cart/get-cart'
import { Product__GetCatalog } from 'modules/product/get-catalog'
import { uniqBy } from 'lodash'
import qs from 'query-string'
import useUser from 'lib/useUser'
import groupProductByCircle from 'lib/groupProductByCircle'
import Float from './Float'
import Summary from './Summary'
import Payment from './Payment'
import Done from './Done'
import Empty from './Empty'
import RecentViewed from './RecentViewed'
import Context from 'hooks/bag'

export default function Bag() {
  const { step, setStep, setCartId } = Context.useContainer()
  const { user } = useUser()
  const router = useRouter()
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push('/catalog')
    }
  }
  let bagItem = []

  const cartSWR = Cart_GetCart.swr(`?user=${user?.id}`, {
    onSuccess: data => {
      setCartId(data?.data?.[0].id)
    }
  })
  const cartData = cartSWR.data?.data?.[0]
  const cartItems = cartData?.cartItems || []
  const cartItemsConstructed = cartItems?.map(i => ({ product: i.product.id, quantity: i.quantity }))
  const ISSERVER = typeof window === "undefined";

  if (!ISSERVER) {
    bagItem = localStorage?.getItem('myBag')
    bagItem = JSON.parse(bagItem) || []
    
    let merged = [
      ...cartItemsConstructed,
      ...bagItem
    ]
    merged = uniqBy(merged, 'product')
    localStorage?.setItem('myBag', JSON.stringify(merged))
  }

  const params = bagItem?.map(i => i.product)
  const qsParams = qs.stringify({ id_in: params })
  const productsSWR = bagItem?.length > 0 && Product__GetCatalog.swr(`?${qsParams}`, { refreshInterval: 0 })
  const data = productsSWR?.data?.data || []
  // Reshape object structure, grouping product by circle
  const loading = bagItem.length !== data.length
  let constructed = groupProductByCircle(data)
  // console.log(params, constructed, loading)
  return (
    <div className='container' style={{ paddingTop: 28, paddingBottom: 70 }}>
      <style jsx>
        {`
          .back {
            color: var(--contentColor);
          }
          .left {
            width: calc(100% - 333px - 100px);
            margin-right: 100px;
          }
          .right {
            width: 333px;
          }
        `}
      </style>
      {
        loading &&
        <div className='f f-ctr mdl' style={{ minHeight: '90vh' }}>
          <LoadingOutlined style={{ fontSize: 32, color: '#ccc' }} />
        </div>
      }
      {
        constructed?.length > 0 &&
        <div className='f'>
          <div className='left'>
            <a className='back' onClick={() => handleBack()} style={{ marginBottom: 15, display: 'inline-block' }}>
              <ArrowLeftOutlined style={{ marginRight: 10 }} />
              {step === 1 && 'Back'}
              {step === 2 && 'My Bag'}
              {step === 3 && 'Pick up & Payment'}
            </a>
            <Summary step={step} constructed={constructed} />
            {step === 2 && <Payment />}
            {step === 3 && <Done />}
          </div>
          <div className='right'>
            <Float cart={cartItems}/>
          </div>
        </div>
      }
      {
        constructed?.length === 0 && !loading &&
        <Empty />
      }
      {/* { step === 1 && <RecentViewed /> } */}

    </div>
  )
}