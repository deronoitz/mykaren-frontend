import { Select, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import css from 'styled-jsx/css'
const { Option } = Select
const style = css.global`
  .menu-category {
    margin: 0 5px;
    color: var(--titleColor);
  }
`
export default function Filter(){
  return (
    <div className='container f mdl f-btw' style={{marginTop: 20}}>
      <style jsx>{style}</style>
      <div className='f mdl'>
        <Button type='default'>All</Button>
        <Button type='link' className='menu-category'>Poster</Button>
        <Button type='link' className='menu-category'>Keychain</Button>
        <Button type='link' className='menu-category'>Sticker</Button>
        <Button type='link' className='menu-category'>Light Novel</Button>
        <Button type='link' className='menu-category'>
          More
          <DownOutlined />
        </Button>

      </div>
      <Select defaultValue={1} style={{width: 140}} size='large' className='antd'>
        <Option value={1}>Popular</Option>
        <Option value={2}>Newest</Option>
      </Select>
    </div>
  )
}