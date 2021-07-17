import { Typography, Button } from "antd"
const EmptyData = () => {
  return (
    <div className="f f-c mdl f-ctr" style={{ minHeight: 400 }}>
      <Typography.Title level={4}>
        Whoops, looks like you haven't joined any booth yet
                </Typography.Title>
      <Typography.Paragraph>
        Let’s get started to create something amazing!
                </Typography.Paragraph>
      <div style={{ marginTop: 10 }}>
        <Button type="primary">Start a new booth</Button>
        <Typography.Text style={{ margin: "0 10px" }}>or</Typography.Text>
        <Button>Join a booth</Button>
      </div>
    </div>
  )
}

export default EmptyData