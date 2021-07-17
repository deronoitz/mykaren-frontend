import { useState } from 'react'
import {
  Modal,
  Typography,
  Button,
  Row,
  Col,
} from 'antd'
import Link from 'next/link'
import { ArrowLeftOutlined } from '@ant-design/icons'
import Input from '../Input/Input'
const AddByCode = () => {
  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <div className="f f-c f-ctr mdl" style={{ width: 360, margin: '0 auto' }}>
          <Typography.Text style={{ textAlign: 'center' }}>
            Enter an invite below to join an existing circle. The invite will look something like these:
          </Typography.Text>
          <Typography.Text style={{ color: 'var(--primaryColor)', textAlign: 'center', margin: '10px 0 25px' }}>
            4pbiq8
             <br />
            https://mykaren.id/invite/4pbiq8
          </Typography.Text>
          <Input placeholder="Enter an invite code or link" />
          <Button style={{ marginTop: 25 }} type="primary">Join a Circle</Button>
        </div>
      </Col>

    </Row>
  )
}


export default function AddCircleModal(props) {
  const [step, setStep] = useState(0);
  const Title = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Button onClick={() => setStep(0)} type="text" className="backButton">
          <ArrowLeftOutlined />
        </Button>
        <Typography.Text strong style={{ color: '#000' }}>
          Join a Circle
        </Typography.Text>
      </div>
    )
  }
  const InitialModal = () => {
    return (
      <Row justify="center" gutter={16}>
        <Col span={12} style={{ textAlign: 'center' }}>
          <div className="block">
            <Typography.Text style={{ display: 'block', marginBottom: 20 }}>
              <b>Create</b> a new circle and invite your member.
            </Typography.Text>
            <img src="/images/create-circle.svg" style={{ marginBottom: 30, height: 76 }} />
            <Link href="/circle/create">
              <Button block type="primary">Create a Circle</Button>
            </Link>
          </div>
        </Col>
        <Col span={12} style={{ textAlign: 'center' }}>
          <div className="block">
            <Typography.Text style={{ display: 'block', marginBottom: 20 }}>
              <b>Join</b> a circle with an invite code or link.
            </Typography.Text>
            <img src="/images/join-circle.svg" style={{ marginBottom: 30 }} />

            <Button block onClick={() => setStep(1)}>Join a Circle</Button>
          </div>
        </Col>
      </Row>
    )
  }
  return (
    <Modal
      title={step === 0 ? "Wanna add a circle?" : <Title />}
      visible={props.visible}
      footer={null}
      bodyStyle={{ paddingTop: 10 }}
      onCancel={props.onCancel}
    >
      <style jsx global>
        {`
          .block {
            border: solid 1px #eee;
            padding: 22px;
            border-radius: 16px;
          }
          .backButton {
            position: absolute;
            left: 0;
            top: 0;
            padding: 13px 20px;
            height: auto;
          }
        `}
      </style>
      {step === 0 ? <InitialModal /> : <AddByCode />}
    </Modal>
  )
}