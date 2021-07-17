import { Typography, Button } from 'antd'
const { Title, Text } = Typography

export function EmailConfirmation({ email }) {
  return (
    <div className="form" style={{ width: 600 }}>
      <div className="f f-ctr mdl f-c">
        <div className="f f-ctr">
          <img
            src="/images/ciby/managecircle_c_final.png"
            style={{
              width: 170,
              objectFit: "cover"
            }}
          />
        </div>
        <Title level={3} style={{ textAlign: "center" }}>Moshi moshi! Please verify your email</Title>
        <Text style={{ textAlign: "center" }}>
          Karen have sent you a confirmation message to <b>{email}</b>.
          Please check on your inbox.
          <br />
          Once it’s done you will be able to start managing circle.
        </Text>
        <div style={{ marginTop: 34 }} className="f f-c f-ctr">
          <Text>If the verification wasn’t received, click button below</Text>
          <Button type="primary" size="large" style={{ marginTop: 10 }}>Resend Confirmation</Button>
        </div>
      </div>
    </div>
  )
}