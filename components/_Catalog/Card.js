
import { Typography, Tag, Avatar } from 'antd'
import { useRouter } from 'next/router'
const { Text } = Typography

export default function Card({ data }) {
  const router = useRouter();
  const circleNameArray = data?.circle?.name.split(' ') || []
  const avatarInitial = circleNameArray.map(i => i[0]).join('')
  return (
    <div className='card' onClick={() => router.push(`/catalog/${data.id}`)}>
      <style jsx>
        {`
          .card {
            width: calc(100% / 4 - 30px);
            margin: 15px;
            cursor: pointer;
          }
          .image {
            height: 230px;
            border-radius: 16px;
            background: #ddd;
            overflow: hidden;
            width: 100%;
            position: relative;
          }
          .image > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .content {
            padding: 10px 10px 5px;
          }
          .image:hover .overlay {
            opacity: 1;
          }
          .overlay {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            padding: 20px 20px;
            z-index: 2;
            opacity: 0;
            transition: .2s ease;
          }
          .overlay::before {
            content: '';
            position: absolute;
            bottom: 0;
            display: block;
            height: 120%;
            left: 0;
            width: 100%;
            z-index: -1;
            background: linear-gradient(0deg, rgb(0 0 0 / 60%), transparent);
          }
        `}
      </style>
      <style jsx global>
        {`
          .circle {
            font-size: 12px;
            color: #fff;
            font-weight: 600;
            margin-left: 10px;
            text-shadow: 0 0 5px rgba(0,0,0,.2)
          }
          .tag-stock {
            position: absolute;
            top: 10px;
            left: 10px;
            padding: 2px 10px;
            z-index: 2;
            font-weight: 500;
            color: var(--primaryColor)
          }
        `}
      </style>
      <div className='image'>
        {data?.stock === 0 && <Tag className='tag-stock'>Out of stock</Tag>}
        <img 
          src={data?.images?.[0]?.formats?.small.url} 
          style={{
            opacity: data?.stock === 0 ? .3 : 1
          }}
        />
        <div className='overlay'>
          <Avatar size={36} src={data?.circle?.profilePicture?.formats.thumbnail.url}>
            {
              !data?.circle?.profilePicture && avatarInitial
            }
          </Avatar>
          <Text className='circle'><span style={{ fontWeight: 400 }}>by</span> {data?.circle?.name}</Text>
        </div>
      </div>
      <div className='content'>
        <div className='f f-btw f-end'>
          <div className='f f-c' style={{ maxWidth: '65%' }}>
            <Text style={{ fontSize: 12 }}>{data?.category?.name || 'Other'}</Text>
            <Text ellipsis={true} style={{ fontSize: 14, color: 'var(--titleColor)', fontWeight: 500 }}>{data?.name}</Text>
          </div>
          <Text style={{ fontSize: 16, fontWeight: 500, color: 'var(--primaryColor)' }}>
            <span style={{ fontWeight: 400, fontSize: 12 }}>Rp.</span> {new Intl.NumberFormat(['ban', 'id']).format(data?.price)}
          </Text>
        </div>
      </div>

    </div>
  )
}