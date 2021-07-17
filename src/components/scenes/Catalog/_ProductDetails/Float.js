import { Typography, Button, Avatar, Input, message } from 'antd'
import { TagsOutlined, PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { uniqBy, filter } from 'lodash'
import { Cart_AddItem } from 'modules/cart/add-cart'
import Context from 'hooks/product-details'
import { useRouter } from 'next/router'
import useUser from 'lib/useUser'
import BagContext from 'hooks/bag'
const { Title, Text } = Typography
export default function Float() {
  const [stock, setStock] = useState(1)
  const [loading, setLoading] = useState(false)
  const { data } = Context.useContainer();
  const { setData: setBagData } = BagContext.useContainer()
  const { isLoggedIn } = useUser()
  const router = useRouter()
  const product = data?.[0]
  const handleTypeStock = e => {
    const { value } = e.target;
    if (value > product?.stock) {
      setStock(product?.stock)
    } else if (value < 1) {
      setStock(1)
    } else {
      setStock(value)
    }
  }
  const handlePlusStock = () => {
    const value = stock + 1;
    if (value <= product?.stock) {
      setStock(value)
    }
  }
  const handleMinStock = () => {
    const value = stock - 1;
    if (value >= 1) {
      setStock(value)
    }
  }

  const handleAddToBag = async () => {
    const itemData = {
      product: product?.id,
      quantity: stock
    }
    setLoading(true)
    if (isLoggedIn) {
      let currentBag = localStorage.getItem('myBag')
      currentBag = JSON.parse(currentBag)
      let isExist = filter(currentBag, i => i.product === product?.id).length > 0
      if(!isExist){
        await Cart_AddItem.fetcher(itemData).then(res => {
          console.log(res)
          if (res.code && res.code >= 400 || res.statusCode && res.statusCode >= 400) {
            message.error('Failed to add item')
          } else {
            if (currentBag) {
              const output = uniqBy([itemData, ...currentBag], 'product')
              localStorage.setItem('myBag', JSON.stringify(output))
              setBagData(output)
            } else {
              localStorage.setItem('myBag', JSON.stringify([itemData]))
              setBagData([itemData])
            }
            message.success(`${product?.name} added to bag!`)
          }
        })
      } else {
        message.success(`${product?.name} added to bag!`)
      }
      setLoading(false)
    } else {
      
      router.push(`/login?return=${router.asPath}`)
    }
  }

  const handleBuyNow = async () => {
    if(isLoggedIn){
      await handleAddToBag()
      await router.push('/bag')
    } else {
      router.push(`/login?return=${router.asPath}`)
    }
  }

  return (
    <div className='float-wrapper'>
      <style jsx>
        {`
          .float-wrapper {
            position: sticky;
            top: 95px;
          }
          .tag {
            margin-right: 15px;
            font-size: 12px;
          }
        `}
      </style>
      <Text style={{ color: 'var(--primaryColor)' }}>{product?.category.name}</Text>
      <Title level={3} style={{ fontWeight: 500, margin: 0 }}>{product?.name}</Title>
      <div style={{ margin: '8px 0' }}>
        <Avatar size={36} src={product?.circle.profilePicture?.formats.thumbnail.url} />
        <Text style={{ marginLeft: 10, fontWeight: 700, color: 'var(--titleColor)' }}><span style={{ fontWeight: 400 }}>by</span> {product?.circle.name}</Text>
      </div>
      <div className='f mdl' style={{ margin: '27px 0 18px' }}>
        {
          product?.stock !== 0 &&
          <div className='f mdl'>
            <Button
              type='primary'
              ghost
              shape='circle'
              size='small'
              disabled={stock === 1}
              onClick={() => handleMinStock()}
            >-</Button>
            <Input
              type='number'
              className='no-arrow'
              min={1}
              max={product?.stock}
              value={stock}
              defaultValue={1}
              onChange={handleTypeStock}
              style={{ fontWeight: 500, width: 67, margin: '0 5px', textAlign: 'center' }}
            />
            <Button
              type='primary'
              ghost
              shape='circle'
              size='small'
              disabled={stock >= product?.stock}
              onClick={() => handlePlusStock()}
            >+</Button>
          </div>
        }
        {
          product?.stock <= 5 && product?.stock !== 0 &&
          <Text style={{ marginLeft: 20 }}>Stock <span style={{ color: 'var(--titleColor)', fontWeight: 500 }}>{product?.stock}</span></Text>
        }
        {
          product?.stock === 0 &&
          <Text style={{ color: 'var(--primaryColor)' }}>Out of stock!</Text>
        }
      </div>
      <div className='f f-btw mdl' style={{ margin: '13px 0' }}>
        {
          product?.stock === 0 &&
          <Text>Price</Text>
        }
        {
          product?.stock !== 0 &&
          <Text>Sub-total</Text>
        }
        <Text style={{ fontWeight: 700, fontSize: 18, color: 'var(--titleColor)' }}>Rp. {new Intl.NumberFormat(['ban', 'id']).format(product?.price)}</Text>
      </div>
      {
        product?.stock !== 0 &&
        <>
          <Button loading={loading} type='primary' block style={{ marginBottom: 10 }} onClick={handleAddToBag}>
            <PlusOutlined /> Add to bag
          </Button>
          <Button type='primary' ghost block onClick={handleBuyNow}>
            Buy now
          </Button>
        </>
      }
      <div className='f f-w' style={{ marginTop: 13 }}>
        <TagsOutlined style={{ color: 'var(--primaryColor)', fontSize: 16, marginRight: 10 }} />
        <a className='tag'>アクリルブロック</a>
        <a className='tag'>vtuber</a>
        <a className='tag'>fgo</a>
      </div>
    </div>
  )
}