import { Typography, Button } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CreateProductContext } from 'hooks/create-product'

const Intro = ({data}) => {
  const { setStep } = CreateProductContext.useContainer()
  const router = useRouter()
  return (
    <> 
      <img src="/images/ciby/WebCat_S_c_final.png" style={{ width: 204, margin: '0 auto 20px', display: 'block' }} />
      <Typography.Title level={3} strong className="centered">
        Add Your Product
      </Typography.Title>
      <Typography.Text className="centered" style={{ display: 'block' }}>
        Add your product and it will be saved in your circle product list. Then you can show the product to event’s catalog that {data.name} attended.
      </Typography.Text>
      <div className="f f-ctr mdl f-c" style={{ marginTop: 30 }}>
        <Button type="primary" onClick={() => setStep(2)} style={{minWidth: 170}}>
          Start
        </Button>
        <br />
        <Link href={`/circle/${router.query.circle}/catalog`}>
          <a className="link lined">Cancel</a>
        </Link>
      </div>
    </>
  )
}

export default Intro