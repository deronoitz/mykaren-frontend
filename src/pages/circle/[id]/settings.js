import { Typography, Button, Divider, Input, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import CircleLayout from "components/commons/Layout/CircleLayout";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Label = (props) => (
  <Text strong style={{ color: "var(--titleColor)", marginBottom: 4, display: "block" }}>
    {props.children}
  </Text>
);

export default function Settings(props) {
  return (
    <CircleLayout>
      <style jsx>
        {`
          .wrapper {
            background: #fff;
            padding: 26px 38px 60px;
            border-radius: 16px;
            box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
            margin: 15px 0;
          }
        `}
      </style>
      <div className="wrapper">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Update Circle Details
          </Title>
          <div style={{ margin: "30px 0" }}>
            <Label>Logo</Label>
            <Text style={{ fontSize: 12, display: "block", marginBottom: 11 }}>
              Karen recommend an image of
              <br />
              at least 512 x 512px for the logo.
            </Text>
            <Button type="primary" ghost>
              Upload logo
            </Button>
          </div>
          <div style={{ width: 360, margin: "30px 0" }}>
            <Label>Circle name</Label>
            <Input placeholder="Super Circle" size="large" />
          </div>
          <div style={{ width: 360, margin: "30px 0" }}>
            <Label>What we do</Label>
            <Select bordered={false} mode="tags" style={{ width: 360 }} placeholder="Click to choose" size="large">
              <Option key="1" value="1">
                Music
              </Option>
              <Option key="2" value="2">
                Game
              </Option>
              <Option key="3" value="3">
                Illustration
              </Option>
            </Select>
          </div>
          <div style={{ width: 740, margin: "30px 0" }}>
            <Label>About</Label>
            <TextArea placeholder="Our circle description..." size="large" autoSize showCount maxLength={250} />
          </div>
          <div className="f mdl" style={{ width: "100%", margin: "30px 0" }}>
            <div style={{ width: 360, marginRight: 20 }}>
              <Label>Facebook URL</Label>
              <Input placeholder="https://www.facebook.com/username" size="large" />
            </div>
            <div style={{ width: 360 }}>
              <Label>Website URL</Label>
              <Input placeholder="https://www.yourcirclewebsite.com" size="large" />
            </div>
          </div>
          <div style={{ width: 360, margin: "30px 0" }}>
            <Label>Instagram account</Label>
            <Input placeholder="@username" size="large" />
          </div>
          <div className="f f-ctr mdl" style={{ marginTop: 35 }}>
            <Button type="primary">Save changes</Button>
          </div>
          <Divider />
          <div className="f mdl f-btw">
            <div>
              <Title level={4} style={{ margin: 0 }}>
                Delete Circle
              </Title>
              <Text style={{ fontSize: 12, color: "var(--contentColor)" }}>
                Once you delete a circle, there is no going back.
              </Text>
            </div>
            <Button>
              <DeleteOutlined />
              Delete Circle
            </Button>
          </div>
        </div>
      </div>
    </CircleLayout>
  );
}
