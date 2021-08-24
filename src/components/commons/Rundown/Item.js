import { Typography } from 'antd'
const { Text } = Typography
export default function Item({ time, title, red }) {
  return (
    <tr>
      <style jsx>
        {`
          .td {
            padding: 12px 20px;
            background: ${red ? '#f9538e' : '#445aa8'};
            border-bottom: solid 1px ${red? '#ff6fa9' : '#20CAEFad'};
          }
          .td:first-child {
            text-align: right;
            border-right: dotted 2px ${red? '#ff6fa9' : '#20CAEFad'};
          }
          tr:nth-child(even) .td {
            background: ${red ? 'var(--primaryColor)' : '#38498f'};
          }
        `}
      </style>
      <td className='td' style={{ width: 140 }}>
        <Text style={{ fontWeight: 500, fontSize: 16, color: '#fff' }}>
          {time}
        </Text>
      </td>
      <td className='td'>
        <Text style={{ fontWeight: 500, fontSize: 16, color: '#fff' }}>
          {title}
        </Text>
      </td>
    </tr>
  )
}