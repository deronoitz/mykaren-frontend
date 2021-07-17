import { Typography, Checkbox, Avatar, Form } from 'antd'
import Item from './Item'
import { useState, useRef, useEffect } from 'react'
import { uniq } from 'lodash'
const { Title, Text } = Typography

export default function Summary({step, constructed}) {
  const [form] = Form.useForm()
  const [checkedValues, setCheckedValues] = useState([])
  const formEl = useRef()
  const handleCircleCheck = (e, values) => {
    const { checked } = e.target
    const current = form.getFieldValue('all') || []
    form.setFieldsValue({
      all: checked ? uniq([...current, ...values]) : [],
    });
    setCheckedValues(form.getFieldValue('all'))
  }
  return (
    <div style={{display: step !== 1 ? 'none' : 'block'}}>
      <style jsx>
        {`
            .circle-wrapper {
              padding: 22px 0 0;
              border-bottom: solid 1px #e8e8e8;
            }
        `}
      </style>
      <Title level={2}>My Bag</Title>
      <div className='f f-btw mdl' style={{ marginTop: 28, paddingBottom: 17, borderBottom: 'solid 1px #e8e8e8' }}>
        <Checkbox size='large'>
          <Text style={{ fontWeight: 500 }}>
            Select All
          </Text>
        </Checkbox>
        <a style={{ fontWeight: 500 }}>
          Remove All
        </a>
      </div>
      <Form form={form} ref={formEl}>
        <Form.Item name='all' >
          <Checkbox.Group style={{ width: '100%' }} onChange={e => setCheckedValues(e)}>
            {
              constructed?.map((i, index) => (
                <div className='circle-wrapper' key={index}>
                  <div className='f mdl'>
                    <Checkbox onChange={(e) => {e.preventDefault(); handleCircleCheck(e, i.products.map(n => n.id))}} />
                    <div className='f mdl' style={{ marginLeft: 34 }}>
                      <Avatar size={36} src={i.circle.image} />
                      <div className='f f-c' style={{ marginLeft: 10 }}>
                        <Text style={{ fontWeight: 700, color: 'var(--titleColor)' }}><span style={{ fontWeight: 400, color: 'var(--contentColor)' }}>by</span> {i.circle.name}</Text>
                        <Text style={{ fontSize: 12, color: 'var(--contentColor)' }}>{i.circle.website}</Text>
                      </div>
                    </div>
                  </div>
                  {
                    i?.products?.map(product => <Item values={checkedValues} key={product.id} data={product} />)
                  }
                </div>
              ))
            }
          </Checkbox.Group>
        </Form.Item>

      </Form>
    </div>
  )
}