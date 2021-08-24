import { Typography, Badge } from 'antd'
import Link from "next/link"
export default function CircleCard(props) {
  return (
    <Link href={`/circle/${props.slug}`}>
      <a>
        <div className="card">
          <style jsx global>
            {`
          .card {
            padding: 20px;
            background: #000;
            border-radius: 16px;
            height: 120px;
            display: inline-flex;
            cursor: pointer;
            width: calc(100% / 3 - 25px);
            align-items: flex-end;
            margin: 0 12px 22px;
            position: relative;
            transition: .2s ease;
            overflow: hidden
          }
          .card:hover {
            background: #333;
            box-shadow: 2px 2px 10px rgba(0,0,0,.2);
          }
          .badge {
            position: absolute;
            top: 15px;
            right: 15px;
          }
          .img {
            position: absolute;
            height: 100%;
            width: 100%;
            object-fit: cover;
            top: 0;
            opacity: .5;
            left: 0;
          }
        `}
          </style>
          <div style={{ zIndex: 1 }}>
            <img
              className="img"
              src={props.banner?.formats?.small?.url}
            />
          </div>
          <div style={{ zIndex: 2 }}>
            <Badge count={props.count} className="badge" />
          </div>
          <div style={{ zIndex: 2 }}>
            <Typography.Text style={{ fontSize: 18, display: 'block', color: '#fff' }} strong>{props.title}</Typography.Text>
            <Typography.Text style={{ fontSize: 12, color: '#f2f2f2' }}>{props.member} Member | {props.products} Products</Typography.Text>
          </div>
        </div>
      </a>
    </Link>
  )
}