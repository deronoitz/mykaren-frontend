import Image from "next/image"
import { Typography, Menu, Dropdown } from "antd"
import { DownOutlined } from "@ant-design/icons"
const { Text } = Typography

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        Edit
      </a>
    </Menu.Item>

    <Menu.Item danger>Delete</Menu.Item>
  </Menu>
);

export default function ProductCard(props) {
  const { data } = props
  console.log(data)
  return (
    <div className="productCard">
      <style jsx>
        {`
          .productCard {
            max-width: 240px;
            margin: 10px;
            box-shadow: 5px 5px 30px rgba(0,0,0,.1);
            border-radius: 16px;
          }
          .content {
            padding: 8px 12px 12px;
            background: #fff;
            border-radius: 0 0 16px 16px;
            overflow: hidden;
          }
          .image {
            width: 240px;
            height: 207px;
            overflow: hidden;
            position: relative;
            border-radius: 16px 16px 0 0;
            background: #000;
          }
          .image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .card-menu {
            position: absolute;
            top: 10px;
            right: 10px;

          }
        `}
      </style>
      <div className="image">
        <img 
          src={data.images?.[0]?.formats?.small?.url}
        />

        <Dropdown overlay={menu} placement="bottomRight" overlayStyle={{width: 120}}>
          <a className="card-menu" onClick={e => e.preventDefault()}>
            <DownOutlined style={{fontSize: 18, color: "#fff"}}/>
          </a>
        </Dropdown>
      </div>
      <div className="content">
        <Text style={{ fontWeight: 700, color: "var(--primaryColor)", display: "block" }}>{data.name}</Text>
        <Text style={{ fontSize: 12, marginBottom: 5, display: "block" }}>{data.category?.name}</Text>
        <div className="f mdl f-btw">
          <Text strong>Rp. {data.price}</Text>
          <Text><b>{data.stock}</b> In stock</Text>
        </div>
      </div>
    </div>
  )
}