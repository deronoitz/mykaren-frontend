import { useRouter } from "next/router";
import { Avatar, Typography, Button, Menu } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";

import Link from "next/link";
import CircleLayout from "components/commons/Layout/CircleLayout";
import ProductCard from "components/commons/ProductCard";

const { Title, Text } = Typography;

export default function Catalog(props) {
  const router = useRouter();
  const { query } = router;

  return (
    <CircleLayout>
      <style jsx>
        {`
          .banner {
            height: 153px;
            border-radius: 8px 8px 0 0;
            background: #000;
            padding: 26px 38px;
            position: relative;
          }
        `}
      </style>
      <div className="banner f mdl f-btw">
        <div className="f mdl">
          <Avatar size={100} icon={<UserOutlined />} style={{ marginRight: 28 }} />
          <div>
            <Title level={3} style={{ color: "#fff", margin: 0 }}>
              Comic Frontier 14
            </Title>
            <div className="f mdl" style={{ marginTop: 5 }}>
              <Avatar size={25} style={{ marginRight: 7 }} />
              <Text style={{ color: "#fff", fontWeight: 500 }}>Reverse Project</Text>
            </div>
          </div>
        </div>
        <Button ghost>Event Details</Button>
      </div>
      <div>
        <Menu mode="horizontal" defaultSelectedKeys={["catalog"]}>
          <Menu.Item key="overview">
            <Link href={`/circle/${query.id}/event/${query.eventid}`}>
              <a>Overview</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="catalog">
            <Link href={`/circle/${query.id}/event/${query.eventid}/catalog`}>
              <a>Catalog</a>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="f f-btw mdl" style={{ paddingTop: 15 }}>
        <Text>Showing 5 products</Text>
        <Button type="primary">
          <PlusOutlined />
          Add Product
        </Button>
      </div>
      <div className="f f-w" style={{ padding: "15px 0", margin: "0 -11px" }}>
        {/* <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> */}
      </div>
    </CircleLayout>
  );
}
