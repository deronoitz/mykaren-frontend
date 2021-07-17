import {
  Typography, Input
} from 'antd'
import { Controller } from 'react-hook-form'
const { Title, Text } = Typography
const { TextArea } = Input

const Label = (props) => (
  <Text strong style={{ color: "var(--titleColor)", marginBottom: 4, display: "block" }}>{props.children}</Text>
)

export default function QuickDetails({ form }) {
  return (
    <>
      <Title level={3} strong className="centered">
        Okay, let’s talk about your product!
      </Title>
      <div style={{ width: '100%', margin: "50px 0 30px" }}>
        <Label>What's your product name</Label>
        <Controller
          name='name'
          defaultValue=''
          control={form.control}
          render={({ onChange, value }) =>
            <>
              <Input onChange={onChange} value={value} placeholder="Product Name" size="large" />
              {form.errors.name && <p style={{ marginTop: 5, color: 'var(--primaryColor)' }}>Product name must be filled!</p>}
            </>
          }
        />
      </div>
      <div style={{ width: '100%', margin: "30px 0" }}>
        <Label>Short description about it?</Label>
        <Controller
          name='description'
          control={form.control}
          defaultValue=''
          render={({ onChange, value }) =>
            <TextArea onChange={onChange} value={value} placeholder="Description" size="large" autoSize={{ minRows: 3 }} maxLength={250} />
          }
        />
      </div>
    </>
  )
}