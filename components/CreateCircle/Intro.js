import { Typography, Button } from 'antd'
import Link from 'next/link'
const Intro = (props) => {
  return (
    <>
      <img src="/images/ciby/Repustasi_fs_c_r_star_1.png" style={{ width: 204, margin: '0 auto 20px', display: 'block' }} />
      <Typography.Title level={3} strong className="centered">
        Are you ready to create a history?
      </Typography.Title>
      <Typography.Text className="centered" style={{ display: 'block' }}>
        Let’s create your own circle and let Karen helps you to manage. By creating a circle, you will have access to use many features of MyKaren.
      </Typography.Text>
      <div className="f f-ctr mdl f-c" style={{ marginTop: 30 }}>
        <Button type="primary" onClick={() => props?.onClickNext()}>
          I'm ready. Let's go!
      </Button>
        <br />
        <Link href="/dashboard">
          <a className="link lined">Cancel</a>
        </Link>
      </div>
    </>
  )
}

export default Intro