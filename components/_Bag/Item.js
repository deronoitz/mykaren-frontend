import { Checkbox, Typography, Input, Button, Modal, message } from 'antd'
import { useState, useEffect } from 'react'
import { includes } from 'lodash'
import Context from 'hooks/bag'
import { useDebounce } from 'use-debounce'
import { Cart_DeleteItem } from 'modules/cart/delete-item'
import { Cart_UpdateItem } from 'modules/cart/update-item'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const { Text } = Typography
const { confirm } = Modal

function showDeleteConfirm(data, cartId) {
  confirm({
    title: 'Are you sure remove this item from bag?',
    icon: <ExclamationCircleOutlined />,
    content: `${data?.name} will be removed from bag`,
    okText: 'Remove',
    okType: 'danger',
    width: 450,
    cancelText: 'Cancel',
    okButtonProps: { type: 'primary' },
    onOk() {
      const id = data?.id
      const storage = JSON.parse(localStorage.getItem('myBag'))
      const output = storage.filter(i => i.product !== id)
      return new Promise((resolve, reject) => {
        Cart_DeleteItem.fetcher({
          product: id,
          cart: cartId
        }).then(res => {
          if (res.code >= 400) {
            reject()
          } else {
            message.success('Item removed from your bag')
            localStorage.setItem('myBag', JSON.stringify(output))

            let newStorage = JSON.parse(localStorage.getItem('myBag'))
            if (newStorage.length === 0) {
              location.reload();
            }
            resolve();
          }
        })
      }).catch(() => message.error('Failed to remove item'));
    },
    onCancel() {
    },
  });
}

export default function Item({ data, values }) {
  const bagLocal = JSON.parse(localStorage.getItem('myBag'));
  const defaultQty = bagLocal.filter(i => i.product === data?.id)?.[0]?.quantity
  const [stock, setStock] = useState(defaultQty)
  const [subTotal, setSubTotal] = useState(stock * data?.price || 0)
  const { total, setTotal, cartId } = Context.useContainer()
  const handleTypeStock = e => {
    const { value } = e.target;
    if (value > data?.stock) {
      setStock(data?.stock)
    } else if (value < 1) {
      setStock(1)
    } else {
      setStock(value)
    }
  }
  const handlePlusStock = () => {
    const value = stock + 1;
    if (value <= data?.stock) {
      setStock(value)
      setSubTotal(value * data?.price)
    }
  }
  const handleMinStock = () => {
    const value = stock - 1;
    if (value >= 1) {
      setStock(value)
      setSubTotal(value * data?.price)
    }
  }
  const [stockDebounced] = useDebounce(stock, 500);
  const checked = includes(values, data?.id)
  useEffect(() => {
    if (checked) {
      const summaryData = {
        id: data?.id,
        count: stock,
        total: subTotal
      }
      if (total.length === 0) {
        setTotal([summaryData])
      } else {
        let output = total;
        output = total.filter(i => i.id !== data.id)
        output = [...output, summaryData]
        setTotal(output)
      }
    } else {
      setTotal(total.filter(i => i.id !== data.id))
    }
  }, [stock, checked])
  useEffect(() => {
    if(cartId){
      const output = {
        product: data?.id,
        quantity: stockDebounced
      }
      try {
        Cart_UpdateItem.fetcher(`${cartId}`, output).then(res => {
          if(res.status === 200){
            let newBag = bagLocal.filter(i => i.product !== data?.id)
            newBag = [...newBag, output]
            localStorage.setItem('myBag', JSON.stringify(newBag))
            console.log('Sync OK')
          }
        })
      } catch {
        message.error('Failed to sync item to server')
      }
    }
  }, [stockDebounced])
  return (
    <div className='f mdl item'>
      <style jsx>
        {`
          .item {
            margin: 50px 0;
          }
          .image {
            height: 100px;
            width: 100px;
            border-radius: 8px;
            overflow: hidden;
            background: #000;
            margin-right: 18px;
          }
          .image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}
      </style>

      <Checkbox value={data?.id} />
      <div className='f f-btw mdl' style={{ width: '100%' }}>
        <div style={{ marginLeft: 34 }} className='f mdl'>
          <div className='image'>
            <img src={data?.images?.[0]?.formats?.small.url} />
          </div>
          <div>
            <Text style={{ fontSize: 16, display: 'block', color: 'var(--titleColor)', lineHeight: 1 }}>{data?.name}</Text>
            {
              data?.stock <= 5 && data?.stock !== 0 &&
              <Text style={{ color: 'var(--primaryColor)', fontSize: 12, fontWeight: 500, lineHeight: 1 }}>{data?.stock} items left</Text>
            }

            <div className='f f-c' style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: 'var(--contentColor)' }}>Price</Text>
              <Text style={{ fontWeight: 600, lineHeight: 1, color: 'var(--titleColor)' }}>Rp. {new Intl.NumberFormat(['ban', 'id']).format(data?.price)}</Text>
            </div>
          </div>
        </div>
        <div className='f mdl'>
          <a style={{ fontWeight: 500, marginRight: 20 }} onClick={() => showDeleteConfirm(data, cartId)}>Remove</a>
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
              max={data?.stock}
              value={stock}
              defaultValue={defaultQty}
              onChange={handleTypeStock}
              style={{ fontWeight: 500, width: 67, margin: '0 5px', textAlign: 'center' }}
            />
            <Button
              type='primary'
              ghost
              shape='circle'
              size='small'
              disabled={stock >= data?.stock}
              onClick={() => handlePlusStock()}
            >+</Button>
          </div>
        </div>

      </div>
    </div>
  )
}