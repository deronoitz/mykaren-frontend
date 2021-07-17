import { Typography } from 'antd'
import Context from 'hooks/product-details'
const { Text, Paragraph } = Typography

export default function Info() {
  const { data } = Context.useContainer()
  return (
    <div className='wrapper'>
      <style jsx>
        {`
          .wrapper {
            width: 300px;
            padding: 15px 0;
          }
          .item {
            margin-bottom: 24px
          }
        `}
      </style>
      <style jsx global>
        {`
          .item-label {
            margin-bottom: 5px;
            font-weight: 500;
            display: block;
            color: var(--titleColor);
          }
        `}
      </style>
      <div className='item'>
        <Text className='item-label'>Event</Text>
        <a>Creator Super Fest 2021</a>
      </div>
      <div className='item'>
        <Text className='item-label'>Item Rating</Text>
        
        <Text>{data?.[0].rating === '1' ? 'GA (General Audience)' : 'PG (Parental Guidence)'}</Text>
      </div>
      <div className='item'>
        <Text className='item-label'>Description</Text>
        <Paragraph style={{lineHeight: '180%'}}>
          {data?.[0].description}
          {/* サイズ：縦150mm 横150mm / 厚さ24mm<br />
          材質：アクリル<br />
          <br />
          雷雷公社HOODIE「HIGH VOLTAGE」vol.2<br />
          <br />
          ※COMITIA127で頒布した「HIGH VOLTAGE vol.1」とは別商品となります。形状やデザイン等異なりますのでご注意ください。
          ※イラストカード等は付きません。<br />
          <br />
          SISE：FREE<br />
          着丈前：72／着丈後：76<br />
          身幅：67<br />
          肩幅：62<br />
          袖丈：36<br />
          <br />
          ※モデル身長 約160㎝ */}
        </Paragraph>
      </div>

    </div>
  )
}