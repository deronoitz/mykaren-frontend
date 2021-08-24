import { Typography } from "antd";

import CardWrapper from "components/scenes/Catalog/CardWrapper";

const { Title } = Typography;

export default function RecentViewed() {
  return (
    <div>
      <div className="container f f-btw mdl" style={{ padding: "56px 0 0" }}>
        <Title level={3} style={{ fontWeight: 500 }}>
          Recent Viewed
        </Title>
      </div>
      <CardWrapper />
    </div>
  );
}
