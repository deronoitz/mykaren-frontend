import { Typography } from 'antd'
import Item from './Item'
const { Title } = Typography
export default function Rundown({day, date, data, red}) {
  return (
    <div className='rundown'>
      <style jsx>
        {`
          .headerRundown {
            text-align: center;
            padding: 14px;
            background: ${red ? 'var(--primaryColor)' : '#20CAEF'};
          }
          .rundown {
            width: 100%;
            margin: 0 10px;
            border-radius: 16px;
            overflow: hidden;
          }
        `}
      </style>

      <div className='headerRundown'>
        <Title style={{marginBottom: 0, color: red ? '#8e0029' : '#38498f'}}>{day} &nbsp;<span style={{ fontWeight: 300 }}>{date}</span></Title>
      </div>
      <div className='wrapper'>
        <table style={{width: '100%'}}>
          <tbody>
            { data?.map((i, index) => <Item key={index} time={i.time} title={i.title} red={red}/>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}