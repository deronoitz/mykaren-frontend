import { Typography, Tag } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import moment from 'moment'
import Status from './Status'
import Link from 'next/link'
const { Text } = Typography;

export default function Item({ data, from = 'transaction' }) {
  const date = moment(data.createdAt).format('DD MMMM YYYY, LTS')
  
  return (
    <Link href={`/${from}/${data.id}`}>
      <div className='item f f-btw mdl'>
        <style jsx>
          {`
          .item {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,.1);
            padding: 26px 34px;
            margin: 10px 0;
            cursor: pointer;
          }
        `}
        </style>
        <div>
          <div className='f mdl'>
            <Text style={{ fontSize: 16, fontWeight: 500, color: 'var(--titleColor)', marginRight: 12 }}>{data.invoiceNumber}</Text>
            {data.status === 'waiting-for-payment' && <Tag color='var(--primaryColor)'>New</Tag>}
            <Status status={data.status} />
          </div>
          <Text style={{ fontSize: 12, color: 'var(--contentColor)' }}>{data.items.length} Items  |  {date}</Text>
        </div>
        <div>
          <Text style={{ color: 'var(--contentColor)' }}>
            Total: <span style={{ fontWeight: 700, color: 'var(--titleColor)' }}>Rp. {new Intl.NumberFormat(['ban', 'id']).format(data.total + data.uniqueCode)}</span>
          </Text>
          <ArrowRightOutlined style={{ marginLeft: 30, color: 'var(--contentColor)' }} />
        </div>
      </div>
    </Link>
  )
}