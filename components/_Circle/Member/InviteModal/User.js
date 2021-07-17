import { useState } from 'react'
import { Avatar, Typography, Button, message } from 'antd'
import { PlusOutlined, CheckCircleFilled } from '@ant-design/icons'
const { Text } = Typography
export default function User() {
  const [sent, setSent] = useState(false)
  const handleSend = () => {
    message.success('Invitation sent to Giita')
    setSent(true)
  }
  return (
    <div className='f mdl f-btw user'>
      <style jsx>
        {`
          .user {
            padding: 15px 15px;
            border-radius: 6px;
            background: #f9f9f9;
            margin-bottom: 10px
          }
        `}
      </style>
      <div className='f mdl'>
        <Avatar size={40} style={{ marginRight: 15 }}>G</Avatar>
        <div>
          <Text style={{ fontWeight: 500, display: 'block', lineHeight: 1 }}>Giita</Text>
          <Text style={{ fontSize: 12, lineHeight: 1 }}>gita.hahahihi@gmail.com</Text>
        </div>
      </div>
      { sent ?
        <CheckCircleFilled style={{fontSize: 24, color: '#C5E824' }}/>
        :
        <Button
          size='small'
          shape='circle'
          onClick={() => handleSend()}
          icon={
            <PlusOutlined style={{ bottom: 1, position: 'relative' }} />
          }
        />
      }
    </div>
  )
}