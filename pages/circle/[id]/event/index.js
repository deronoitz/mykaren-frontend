import CircleLayout from "../../../../components/Layout/CircleLayout"
import { Typography } from "antd"
import EventCard from "../../../../components/EventCard"
const { Title } = Typography

export default function Event(props) {
  return (
    <CircleLayout>
      <div style={{ marginBottom: 25 }}>
        <Title level={4}>Our Upcoming Event</Title>
      </div>
      <EventCard />
      <EventCard />
      <EventCard />
    </CircleLayout>
  )
}