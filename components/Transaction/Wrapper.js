import Item from './Item'
import { Button } from 'antd'
import { Transaction_Get } from 'modules/transaction/get-transaction'
import css from 'styled-jsx/css'
const style = css.global`
  .menu-category {
    margin: 0 5px;
    color: var(--titleColor);
  }
`
export default function TransactionWrapper({ query }) {
  const TransactionSWR = Transaction_Get.swr('?' + query)
  const TransactionData = TransactionSWR.data
  return (
    <div>
      <style jsx>{style}</style>

      <div className='f mdl' style={{ margin: '30px 0 20px' }}>
        <Button size='small' type='primary'>All</Button>
        <Button size='small' type='link' className='menu-category'>Waiting for payment</Button>
        <Button size='small' type='link' className='menu-category'>In progress</Button>
        <Button size='small' type='link' className='menu-category'>Done</Button>
      </div>
      {
        TransactionData?.data?.map(i => <Item key={i.id} data={i} />)
      }
    </div>
  )
}