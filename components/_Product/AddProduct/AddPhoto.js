import {
  Typography, Upload
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Controller } from 'react-hook-form'
const { Text } = Typography
const { Dragger } = Upload;

export default function AddPhoto({form}) {

  return (
    <>
      <Controller
        name='images'
        control={form.control}
        defaultValue={{}}
        render={({ onChange, value }) =>
          <Dragger multiple={true} beforeUpload={() => false} onChange={onChange}>
            <div className='f mdl f-ctr'>
              <PlusOutlined style={{ color: 'var(--primaryColor)', fontSize: 22, marginRight: 10 }} />
              <Text style={{ color: 'var(--contentColor)', marginTop: 5 }}>Click or drag file to this area to upload</Text>
            </div>
          </Dragger>
        }
      />
    </>
  )
}