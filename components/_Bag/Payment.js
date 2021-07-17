import { Typography, Radio, Input } from 'antd'
import { useState } from 'react'
import useUser from  'lib/useUser'
const { Title, Text } = Typography
const Label = (props) => (
  <Text strong style={{ color: "var(--titleColor)", marginBottom: 4, display: "block" }}>{props.children}</Text>
)
export default function Payment() {
  const [radio, setRadio] = useState(1)
  const { user } = useUser()
  const handleRadio = e => {
    setRadio(e.target.value)
  }
  return (
    <div>
      <style jsx>
        {`
          .separator {
            height: 1px;
            width: 100%;
            background: #e8e8e8;
            margin: 30px 0;
          }
          .bank-item {
            padding: 20px 24px;
            border: solid 1px #E4E4E7;
            border-radius: 8px;
          }
          .bank-item img {
            mix-blend-mode: multiply
          }
          .bank-item.selected {
            border: solid 2px var(--primaryColor);
            background: rgba(247, 41, 99, 0.05);
          }
        `}
      </style>
      <Title level={2}>Pick up & Payment</Title>
      <Text style={{ fontSize: 16, fontWeight: 500, color: 'var(--titleColor)', display: 'block', marginTop: 20 }}>Will be picked up by</Text>
      <Radio.Group style={{ marginTop: 22 }} defaultValue={1} value={radio} onChange={handleRadio}>
        <Radio value={1} style={{ display: 'flex', marginBottom: 26 }}>
          <div style={{ marginLeft: 5 }}>
            <Text style={{ fontWeight: 500, color: 'var(--titleColor)' }}>
              Myself ({user?.profile?.firstName + ' ' + user?.profile?.lastName})
            </Text>
          </div>
        </Radio>
        <Radio value={2} style={{ display: 'flex' }} disabled>
          <div className='f f-c' style={{ marginTop: -2, marginLeft: 5 }}>
            <Text style={{ fontWeight: 500, color: 'var(--titleColor)' }}>
              Another person
            </Text>
            <Text style={{ fontSize: 12 }}>
              You need to fill some information about the person
            </Text>
            {
              radio === 2 &&
              <div className='f f-c' style={{ marginTop: 20 }}>
                <Label>Name</Label>
                <Input placeholder='Name' style={{ marginBottom: 15 }} />
                <Label>Phone number</Label>
                <Input placeholder='Phone number' />
              </div>
            }
          </div>
        </Radio>
      </Radio.Group>
      <div className='separator' />
      <Text style={{ fontSize: 16, fontWeight: 500, color: 'var(--titleColor)', display: 'block', marginBottom: 22 }}>Payment method</Text>
      <Text style={{ fontWeight: 500, color: 'var(--titleColor)', marginBottom: 14, display: 'block' }}>
        Bank Transfer
      </Text>
      <div className='bank-item f mdl selected'>
        <img src='/images/bank/bni.jpg' />
        <Text style={{ fontWeight: 500, color: 'var(--titleColor)', marginLeft: 17 }}>BNI</Text>
      </div>
    </div>
  )
}