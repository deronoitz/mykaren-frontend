import { Typography, Button, Tag } from "antd"
import Image from "next/image"
import { CalendarOutlined, AimOutlined } from "@ant-design/icons"
const { Text, Title } = Typography

export default function EventCard(props) {
  return (
    <div className="card f">
      <style jsx>
        {`
          .card {
            background: #fff;
            border-radius: 16px;
            margin-bottom: 17px;
            box-shadow: 5px 5px 30px rgba(0,0,0,.1);
            overflow: hidden;
          }
          .content {
            padding: 20px 25px;
            width: calc(100% - 270px);
          }
          .image {
            height: 175px;
            width: 270px
          }
        `}
      </style>
      <div className="image">
        <Image
          src="/images/dump/test.png"
          height={175}
          width={270}
        />
      </div>
      <div className="content f f-btw">
        <div>
          <div className="f mdl" style={{ marginBottom: 10 }}>
            <Title level={4} style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Comic Frontier 14</Title>
            <Tag style={{ marginLeft: 10 }} color="orange">New</Tag>
          </div>
          <Text style={{ color: "var(--primaryColor)", fontWeight: 500, fontSize: 12, display: "block" }}>
            <CalendarOutlined style={{ marginRight: 8, fontSize: 14, color: "var(--primaryColor)" }} />
              22 - 23 February 2020
            </Text>

          <Text style={{ fontWeight: 500, display: "block", fontSize: 12, marginTop: 10 }}>
            <AimOutlined style={{ marginRight: 8, fontSize: 14, color: "var(--primaryColor)" }} />
            Balai Kartini, Jakarta, Indonesia
          </Text>
        </div>
        <div style={{marginTop: 15}}>
          <Button type="primary" style={{marginBottom: 10, minWidth: 150}}>Preparation</Button>
          <br />
          <Button style={{minWidth: 150}}>Event Details</Button>
        </div>
      </div>
    </div>
  )
}