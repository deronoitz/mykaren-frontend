import { Image } from 'antd'
import { useState } from 'react'
import Context from 'hooks/product-details'
export default function Gallery() {
  const [active, setActive] = useState(0)
  const { data } = Context.useContainer();
  const product = data?.[0]
  return (
    <div className='f'>
      <style jsx>
        {`
          .main {
            height: 380px;
            width: 380px;
            overflow: hidden;
            border-radius: 8px;
            background: #000;
            margin-right: 45px;
          }
          .main img {
            height: 100%;
            width: 100%;
            object-fit: cover
          }
          .thumbnail-item {
            height: 60px;
            width: 60px;
            border-radius: 8px;
            overflow: hidden;
            background: #000;
            margin-bottom: 8px;
            cursor: pointer;
          }
          .thumbnail-item.active {
            box-shadow: 0 0 0 2px var(--primaryColor);
          }
          .thumbnail-item img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        `}
      </style>
      <style jsx global>
        {`
          .main .ant-image {
            height: 100%
          }
          .main .ant-image img {
            height: 100%;
            object-fit: cover;
          }
        `}
      </style>
      <div style={{ marginRight: 22 }}>
        {
          product?.images?.map((i, index) =>
            <div key={i.id} onClick={() => setActive(index)} className={`thumbnail-item ${active === index && 'active'}`}>
              <img src={i.formats?.thumbnail?.url} alt={i.name}/>
            </div>
          )
        }
      </div>
      <div className='main'>       
        <Image 
          src={product?.images?.[active].formats?.small?.url} 
          preview={{
            src: product?.images?.[active].formats?.large?.url
          }}
        />
      </div>
    </div>
  )
}