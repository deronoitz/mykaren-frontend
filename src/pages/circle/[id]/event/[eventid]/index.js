import React from "react";
import Link from "next/link";
import CircleLayout from "components/commons/Layout/CircleLayout";

import { useRouter } from "next/router";
import { Typography, Avatar, Button, Menu, List, Tag } from "antd";
import { LineDecoration } from "components/commons/Decoration";
import { UserOutlined, CalendarOutlined, AimOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const data = [
  {
    title: "Reverse Project, some items in your catalog are prohibited",
    tag: ["New", "Critical"],
    date: "22 February 2020",
    detail: "Some of your items can’t be sold in Comic Frontier 14. The items will be marked on catalog."
  },
  {
    title: "Get Ready for Comic Frontier 14!",
    date: "6 August 2020",
    detail: "Halo semua Partisipan Comic Frontier 14!! Apakah kalian sudah siap dengan Comic Frontier 14?"
  }
];
export default function EventDetail(props) {
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
          .upcoming-event {
            background: #fff;
            padding: 26px 38px 40px;
            border-radius: 8px;
            margin-top: 15px;
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
        <Menu mode="horizontal" defaultSelectedKeys={["overview"]}>
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

      <div className="upcoming-event">
        <Title level={4} style={{ marginBottom: 20 }}>
          Overview
        </Title>
        <div className="f">
          <div className="f mdl f-btw" style={{ width: "45%" }}>
            <div className="statisticItem f f-c">
              <Title strong style={{ fontSize: 48, margin: 0 }}>
                C-12b
              </Title>
              <Text style={{ fontSize: 14 }}>Booth Number</Text>
              <LineDecoration m="8px 0 0 0" c="#F72963" />
            </div>

            <div className="statisticItem f f-c">
              <Title strong style={{ fontSize: 48, margin: 0 }}>
                4
              </Title>
              <Text style={{ fontSize: 14 }}>Products</Text>
              <LineDecoration m="8px 0 0 0" c="#20CAEF" />
            </div>
          </div>
          <div style={{ width: "55%", borderLeft: "solid 1px #e8e8e8", marginLeft: 50, paddingLeft: 50 }}>
            <Text strong style={{ color: "rgba(0,0,0,.85)", display: "block" }}>
              <CalendarOutlined style={{ marginRight: 8, color: "var(--primaryColor)" }} />
              Event Date
            </Text>
            <Text style={{ marginLeft: 22, display: "block" }}>22 - 23 February 2020 </Text>

            <Text strong style={{ color: "rgba(0,0,0,.85)", display: "block", marginTop: 15 }}>
              <AimOutlined style={{ marginRight: 8, color: "var(--primaryColor)" }} />
              Location
            </Text>
            <Text style={{ marginLeft: 22, display: "block" }}>Balai Kartini, Jakarta, Indonesia</Text>
          </div>
        </div>
      </div>

      <div className="upcoming-event" style={{ marginBottom: 40, paddingBottom: 26 }}>
        <Title level={4} style={{ marginBottom: 20 }}>
          Announcement
        </Title>

        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <React.Fragment>
                    <a href="https://ant.design" style={{ fontWeight: 600, color: "rgba(0,0,0,.85)", marginRight: 10 }}>
                      {item.title}
                    </a>
                    {(item.tag || []).map((tag) => (
                      <Tag color="orange">{tag}</Tag>
                    ))}
                  </React.Fragment>
                }
                description={
                  <div>
                    <Text style={{ color: "var(--primaryColor)" }}>{item.date}</Text>
                    <Text> - {item.detail}</Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </CircleLayout>
  );
}
