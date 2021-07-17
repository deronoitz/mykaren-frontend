import {
  Typography, Button, Input, Select, Radio, Avatar
} from 'antd'
import QuickDetails from './QuickDetais'
import AddPhoto from './AddPhoto'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { CreateProductContext } from 'hooks/create-product'
import { Product__GetCategory } from 'modules/product/get-category'
import { Circle__GetMember } from 'modules/circle/get-member'
import { useRouter } from 'next/router'
const { Text } = Typography
const { Option } = Select

const Label = (props) => (
  <Text strong style={{ color: "var(--titleColor)", marginBottom: 7, display: "block" }}>{props.children}</Text>
)

const radioItem = {
  display: 'block',
  margin: '10px 0'
}

let initial = (data) => data.firstName?.split("")[0] + data.lastName?.split("")[0] || ""


export default function Details({ form, style }) {
  const router = useRouter()
  const { setStep } = CreateProductContext.useContainer()
  const [creator, setCreator] = useState(1)
  const categorySWR = Product__GetCategory.swr();
  const memberSWR = router.query && Circle__GetMember.swr(`?circle=${router?.query?.circle}`)
  return (
    <div style={style}>
      <QuickDetails form={form} />
      <div style={{ width: '100%', margin: "30px 0" }}>
        <Label>Product price</Label>
        <Controller
          name='price'
          control={form.control}
          defaultValue=''
          render={({ onChange, value }) =>
            <>
              <Input onChange={onChange} value={value} type='number' className="inputAddOn" addonBefore='Rp.' placeholder="Insert price" size="large" />
              {form.errors.price && <p style={{ marginTop: 5, color: 'var(--primaryColor)' }}>Price must be filled!</p>}
            </>
          }
        />
      </div>
      <div style={{ width: '100%', margin: "30px 0" }}>
        <Label>Product stock</Label>
        <Controller
          name='stock'
          control={form.control}
          defaultValue={0}
          render={({ onChange, value }) =>
            <>
              <Input onChange={onChange} value={value} type='number' min={0} placeholder="Insert stock" size="large" />
            </>
          }
        />
      </div>

      <div>
        <Label>Add product image</Label>
        <Text style={{ fontSize: 12, color: 'var(--contentColor)', margin: '-5px 0 10px', display: 'block' }}>
          (Maximum resolution of images 1500x1500px)
        </Text>
        <AddPhoto form={form} />
      </div>

      <div style={{ width: '100%', margin: "30px 0" }}>
        <Label>Select category</Label>

        <Controller
          name='category'
          control={form.control}
          defaultValue={[]}
          render={({ onChange, value }) =>
            <>
              <Select
                className="karenSelector"
                placeholder='Select category'
                style={{ width: '100%' }}
                size='large'
                onChange={onChange}
                value={value}
              >
                {categorySWR.data?.data?.map(i => <Option key={i.id} value={i.id}>{i.name}</Option>)}
              </Select>
              {form.errors.category && <p style={{ marginTop: 5, color: 'var(--primaryColor)' }}>Category must be filled!</p>}

            </>
          }
        />
      </div>
      <div style={{ width: '100%', margin: "30px 0 10px" }}>
        <Label>Who create this</Label>
        <Radio.Group defaultValue={creator} onChange={e => setCreator(e.target.value)}>
          <Radio style={radioItem} value={1}>Circle work</Radio>
          <Radio style={radioItem} value={2}>Personal work</Radio>
        </Radio.Group>
        {
          creator === 2 &&
          <Controller
            name='artist'
            control={form.control}
            defaultValue={[]}
            render={({ onChange, value }) =>
              <Select
                className="karenSelector user"
                mode="multiple"
                placeholder='Select creator'
                onChange={onChange}
                value={value}
                style={{ width: '100%', marginTop: 20 }}
              >
                {
                  memberSWR.data?.data.map(i =>
                    <Option value={i.user.id} key={i.user.id}>
                      <div className='f mdl' style={{ padding: 5 }}>
                        <Avatar>{initial(i)}</Avatar>
                        <div style={{ marginLeft: 10 }}>
                          <Text style={{ display: 'block', marginBottom: -3 }}>
                            {i.firstName + ' ' + i.lastName}
                          </Text>
                          <Text style={{ fontSize: 12, color: 'var(--contentColor)' }}>{i.user.email}</Text>
                        </div>
                      </div>
                    </Option>
                  )
                }
              </Select>
            }
          />
        }
      </div>
      <div style={{ width: '100%', margin: "20px 0 10px" }}>
        <Label>Whats the rating</Label>
        <Controller
          name='rating'
          control={form.control}
          defaultValue={1}
          render={({ onChange, value }) =>
            <Radio.Group value={value} onChange={e => onChange(e.target.value)}>
              <Radio style={radioItem} value={1}>GA (General Audience)</Radio>
              <Radio style={radioItem} value={2}>PG (Parental Guidence)</Radio>
            </Radio.Group>
          }
        />
      </div>
      <div style={{ width: '100%', margin: "20px 0" }}>
        <Label>Insert product tags</Label>
        <Text style={{ fontSize: 12, color: 'var(--contentColor)', margin: '-5px 0 10px', display: 'block' }}>(This will help Karen to search your product)</Text>
        <Controller
          name='tags'
          control={form.control}
          defaultValue={[]}
          render={({ onChange, value }) =>
            <Select
              className="karenSelector"
              mode="tags"
              placeholder='Type tag'
              style={{ width: '100%' }}
              allowClear
              onChange={onChange}
              value={value}
            >
              <Option value='illustration'>Illustration</Option>
              <Option value='game'>Game</Option>
            </Select>
          }
        />
      </div>
      <div className="f f-ctr mdl f-c" style={{ marginTop: 30 }}>
        <Button type="primary" style={{ minWidth: 170 }} htmlType='submit'>
          Next
        </Button>
        <br />
        <a className="link lined" onClick={() => setStep(1)}>Previous</a>
      </div>
    </div>
  )
}