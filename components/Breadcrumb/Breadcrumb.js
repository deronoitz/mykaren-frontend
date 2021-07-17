import { Breadcrumb } from 'antd'
import Link from 'next/link'
import Context from 'hooks/product-details'
export default function BreadcrumbKaren() {
  const { data } = Context.useContainer();
  const product = data?.[0]
  return (
    <div className="breadcrumb-container">
      <style jsx>
        {`
          .breadcrumb-container {
            background: #fff;
            // padding: 10px 23px;
            border-radius: 5px;
            margin: 20px 0;
            display: inline-block;
            width: 100%;
          }
        `}
      </style>
      <Breadcrumb>
        <Breadcrumb.Item>
        <Link href='/catalog'>
          <a>Catalog</a>
        </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{color: 'var(--primaryColor)'}}>{product?.name}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}