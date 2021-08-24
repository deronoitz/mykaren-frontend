import { Typography, List, Button } from "antd";

import BannerOverview from "components/scenes/Circle/Banner/Overview";
import StatisticWrapper from "components/scenes/Circle/StatisticWrapper";

const { Title, Text } = Typography;

const data = [
  {
    title: "Comic Frontier 14",
    date: "22 February 2020",
    place: "Balai Kartini, Jakarta, Indonesia"
  },
  {
    title: "Creator Super Fest 2020",
    date: "6 August 2020",
    place: "Jakarta, Indonesia"
  }
];

export default function CirclePage() {
  return (
    <>
      <style jsx>
        {`
          .upcoming-event {
            background: #fff;
            padding: 26px 38px 40px;
            border-radius: 16px;
            margin-top: 15px;
            box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
      <BannerOverview />
      <StatisticWrapper />

      <div className="upcoming-event" style={{ marginBottom: 40, paddingBottom: 26 }}>
        <Title level={4} style={{ marginBottom: 20 }}>
          Upcoming Event
        </Title>

        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="primary" ghost>
                  Event Details
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <span
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 50,
                      background: "var(--primaryColor)",
                      display: "block",
                      marginTop: 6
                    }}
                  />
                }
                title={
                  <a href="https://ant.design" style={{ fontWeight: 600, color: "rgba(0,0,0,.85)" }}>
                    {item.title}
                  </a>
                }
                description={
                  <div>
                    <Text style={{ color: "var(--primaryColor)" }}>{item.date}</Text>
                    <Text> - {item.place}</Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
