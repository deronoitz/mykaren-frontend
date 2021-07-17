import { Typography, Button } from 'antd'
import { useRouter } from 'next/router'
const { Title, Text } = Typography
export default function Empty() {
  const router = useRouter();
  return (
    <div className='f f-ctr mdl f-c' style={{ height: '70vh' }}>
      <img src='/images/empty.svg' style={{ marginBottom: 30 }} />
      <Title className='centered' level={3}>Your cart is empty...</Title>
      <Text className='centered' style={{ color: 'var(--contentColor)' }}>Let’s fill it with amazing creature from<br />your favorite artists or circles</Text>
      <Button onClick={() => router.push('/catalog')} type='primary' style={{ width: 300, marginTop: 30 }}>Start Shopping</Button>
    </div>
  )
}