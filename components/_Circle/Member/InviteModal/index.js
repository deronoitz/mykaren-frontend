import { Modal, Typography, Button, Input, message, Form } from 'antd'
import { useEffect, useState } from 'react'
import moment from 'moment'
// import User from './User'
import useUser from 'lib/useUser'
import { Invite__GetActive } from 'modules/invite/get-active-code'
import { Invite__CreateCode } from 'modules/invite/create-code'
import { Invite__SendEmail } from 'modules/invite/send-invitation'
import random from 'lib/createId'
import Context from 'hooks/circle'

const { Text } = Typography
export default function InviteModal({ visible = false, close }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { data: circle } = Context.useContainer()
  const activeSWR = Invite__GetActive.swr(`?circle=${circle.id}`)
  const { user } = useUser()
  const currentCodes = activeSWR.data?.data
  const activeCode = currentCodes?.filter(i => moment(i.expiredDate).isAfter(new Date) || !i.expiredDate) || []
  const currentInvite = activeCode?.[activeCode.length - 1]

  useEffect(() => {
    if (visible && !currentInvite) {
      const id = random(6)
      const circleId = circle?.id
      const userId = user?.id
      const data = {
        code: id,
        circle: circleId,
        created_by: userId,
        updated_by: userId,
      }
      handleCreateCode(data)
    }
  }, [currentInvite, visible])

  const handleCopy = () => {
    message.success('Link copied!')
  }

  const handleSend = () => {
    setLoading(true)
    const data = {
      email,
      code: currentInvite.code
    }
    Invite__SendEmail.fetcher(data).then(res => {
      if(res.code >= 400){
        message.error(res.message)
        setLoading(false)
      } else {
        setLoading(false)
        message.success(`Invitation sent to ${email}`)
      }
    })
  }

  const handleCreateCode = async data => {
    await Invite__CreateCode.fetcher(data).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Modal
      visible={visible}
      title={`Invite new member to ${circle.name}`}
      width={417}
      footer={false}
      onCancel={() => close()}
      bodyStyle={{
        padding: 0
      }}
    >
      <style jsx>
        {`
          .box-invite {
            border-radius: 14px;
            background: #efefef;
            padding: 5px 8px 5px 16px;
            margin: 5px 0;
          }
          .wrapper {
            padding: 10px 25px 16px;
          }
        `}
      </style>
      <div className='wrapper' id='mykaren'>
        <Form onFinish={handleSend} style={{ width: '100%' }}>
          <div className='f'>
            <Form.Item
              name='email'
              rules={[{ type: 'email', message: 'Please insert a valid email address', required: true }]}
              style={{ paddingRight: 20, marginBottom: 0, width: '100%', marginTop: 3 }}
            >
              <Input
                placeholder='Enter email address'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Item>
            <Button loading={loading} htmlType='submit'>Send</Button>
          </div>
        </Form>
        {/* <div style={{ margin: '15px 0' }}>
          <User />
        </div> */}
      </div>
      <div className='wrapper' style={{ borderTop: 'solid 1px #ebebeb' }}>
        <Text style={{ fontSize: 12 }}>Or, send a circle invite link to new member</Text>
        <div className='box-invite f f-btw mdl'>
          <Text>
            https://mykaren.id/invite/{currentInvite?.code || ''}
          </Text>
          <Button type='primary' onClick={() => handleCopy()}>
            Copy
          </Button>
        </div>
        <Text style={{ fontSize: 12 }}>Your invite link expires in 1 day. <a>Edit invite link</a></Text>

      </div>
    </Modal>
  )
}