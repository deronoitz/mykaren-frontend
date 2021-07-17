import { Typography } from "antd"
import { LineDecoration } from 'components/Decoration'
const { Title, Text } = Typography

export default function Item({count, title, color}) {
  return (
    <div className="statisticItem f f-c">
      <Title strong style={{ fontSize: 48, margin: 0 }}>{count}</Title>
      <Text style={{ fontSize: 14 }}>{title}</Text>
      <LineDecoration m="8px 0 0 0" c={color} />
    </div>
  )
}