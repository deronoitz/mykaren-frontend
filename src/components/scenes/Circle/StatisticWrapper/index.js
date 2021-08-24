import { Typography } from "antd"
import Context from "hooks/circle"
const { Title } = Typography
import Item from "./Item"

export default function StatisticWrapper(props) {
  const { data: circle } = Context.useContainer()
  return (
    <div className="wrapper">
      <style jsx>
        {`
          .wrapper {
            background: #fff;
            padding: 26px 38px 40px;
            border-radius: 16px;
            box-shadow: 5px 5px 30px rgba(0,0,0,.1);
            margin-top: 15px;
          }
        `}
      </style>
      <Title level={4} style={{ marginBottom: 20 }}>Statistics</Title>
      <div className="f">
        <div className="f mdl f-btw" style={{ width: "100%" }}>
          <Item count={0} title='Event attended' color="#F72963"/>
          <Item count={circle.products.length} title='Products' color="#20CAEF"/>
          <Item count={circle.members.length} title='Members' color="#CCC"/>
          <Item count={0} title='Profits' color="#C5E824"/>
        </div>

      </div>
    </div>
  )
}