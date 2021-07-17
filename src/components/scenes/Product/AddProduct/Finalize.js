import {
  Typography, Button, Tag, Avatar
} from 'antd'
import { useEffect, useState } from 'react'
import { CreateProductContext } from 'hooks/create-product'
import { Circle__GetMember } from 'modules/circle/get-member'
import { Product__GetCategory } from 'modules/product/get-category'
import { useRouter } from 'next/router'
import { size } from 'lodash'
import getBase64 from 'lib/getBase64'
const { Title, Text } = Typography

const Label = (props) => (
  <Text strong style={{ color: "var(--titleColor)", marginBottom: 2, display: "block" }}>{props.children}</Text>
)
let initial = (data) => data.firstName?.split("")[0] + data.lastName?.split("")[0] || ""

export default function Finalize({ data, style, circleData, loading }) {
  const { setStep } = CreateProductContext.useContainer()
  const [imgPreview, setImgPreview] = useState([])
  const router = useRouter()
  const { data: members } = Circle__GetMember.swr(`?circle=${router?.query?.circle}`)
  const { data: category } = Product__GetCategory.swr()
  const categoryName = category?.data.filter(i => data.category === i.id)[0]?.name
  const artists = members?.data?.filter(i => data?.artist?.map(n => i.id === n))
  useEffect(() => {
    if (size(data.images) > 0) {
      async function handlePreview() {
        let images = []
        for (let img of data?.images?.fileList) {
          const origin = img.originFileObj
          const base64 = await getBase64(origin)
          images = [...images, base64]
        }
        setImgPreview(images)
      }
      handlePreview()
    }
  }, [data?.images])

  return (
    <div style={style}>
      <style jsx>
        {`
          .item {
            margin-bottom: 15px
          }
          .imgPreview {
            width: calc(100% / 3 - 10px);
            height: 120px;
            margin: 5px;
            overflow: hidden;
            border: solid 1px #e8e8e8;
          }
          .imgPreview img{
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}
      </style>
      <Title level={3} strong className="centered">
        Finally, make sure your<br />product is correct
      </Title>
      <div className='f mdl f-btw' style={{ marginTop: 40 }}>
        <div className='item'>
          <Label>Product Name</Label>
          <Text>{data.name || '-'}</Text>
        </div>
        <div className='item'>
          <Label>Product Price</Label>
          <Text style={{ color: 'var(--primaryColor)' }}>Rp. {data.price || '-'}</Text>
        </div>
      </div>
      <div className='item'>
        <Label>Description</Label>
        <Text>{data.description || '-'}</Text>
      </div>
      <div className='item'>
        <Label>Category</Label>
        <Text>{categoryName || '-'}</Text>

        {/* {data.category?.length > 0 ? data.category.map((i, index) => <Tag key={index}>{i}</Tag>) : '-'} */}
      </div>
      <div className='item'>
        <Label>Product Rating</Label>
        <Text>{data.rating === 1 ? 'GA (General Audience)' : <span style={{ color: '#eca80a' }}>PG (Parental Guidence)</span>}</Text>
      </div>
      <div className='item'>
        <Label>Tags</Label>
        <div>
          {data.tags?.length > 0 ? data.tags.map((i, index) => <Tag key={index}>{i}</Tag>) : '-'}
        </div>
      </div>
      <div className='item'>
        <Label>Created By</Label>
        <div style={{ marginTop: 10 }}>
          {data.artist?.length > 0 ?
            <>
              {
                artists.map(i =>
                  <div key={i.id}>
                    <Avatar style={{ marginRight: 10 }}>{initial(i)}</Avatar>
                    <Text>{i.firstName + ' ' + i.lastName}</Text>
                  </div>
                )
              }
            </>
            :
            <div>
              <Avatar style={{ marginRight: 10 }} src={circleData.profilePicture?.formats?.thumbnail.url} />
              <Text>{circleData.name}</Text>
            </div>
          }
        </div>
      </div>
      <div className='item'>
        <Label>Images</Label>
        {
          imgPreview.length === 0 && '-'
        }
        <div className='f mdl f-w' style={{ margin: '10px -5px' }}>
          {
            imgPreview.map((i, index) =>
              <div className='imgPreview' key={index}>
                <img src={i} />
              </div>
            )
          }
        </div>
      </div>

      <div className="f f-ctr mdl f-c" style={{ marginTop: 30 }}>
        <Button loading={loading} type="primary" style={{ minWidth: 170 }} htmlType='submit'>
          Save
        </Button>
        <br />
        <a className="link lined" onClick={() => setStep(2)}>Previous</a>
      </div>
    </div>
  )
}