import CircleLayout from "components/commons/Layout/CircleLayout";
import EventCard from "components/commons/EventCard";

import { Typography } from "antd";

const { Title } = Typography;

export default function Event() {
  return (
    <CircleLayout>
      <div style={{ marginBottom: 25 }}>
        <Title level={4}>Our Upcoming Event</Title>
      </div>
      <EventCard />
      <EventCard />
      <EventCard />
    </CircleLayout>
  );
}
