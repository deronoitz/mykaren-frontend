import KarenParticle from '../components/Particle'
import { LineDecoration } from '../components/Decoration'
import Link from '../components/Link/Link'
import { useEffect } from 'react'
import PublicLayout from '../components/Layout/PublicLayout'
import { Typography, Button } from 'antd'
import css from 'styled-jsx/css'
const style = css.global`
  .statistic {
    background: #fbfbfb;
    padding: 40px 0;
  }
  .statisticItem {
    padding: 0 60px;
    width: calc(100% / 3);
    border-right: solid 1px #c4c4c4
  }
  .statisticItem:nth-child(2){
    text-align: center;
  }
  .statisticItem:last-child {
    border-right: none;
    text-align: right
  }
  .features {
    padding: 76px 0;
  }
  .featureItem {
    background: #fbfbfb;
    padding: 23px 42px;
    margin: 10px;
    width: calc(50% - 20px)
  }
  .featureItem img{
    max-width: 163px;
  }
  .featureItem a {
    margin-top: 10px;
  }
  .copy {
    background: var(--primaryColor);
    padding: 100px 0;
  }
  
`
function LandingPage() {
  useEffect(() => {
    document.title = 'Home | MyKaren'
  })
  return (
    <div>
      <style jsx>
        {style}
      </style>
      <PublicLayout>
        <div style={{ position: 'absolute', zIndex: -1, opacity: .3 }}>
          <KarenParticle height={556} />
        </div>

        <div className="container f f-c f-ctr" style={{ minHeight: 550 }}>
          <Typography.Title level={1} style={{ maxWidth: 665 }}>
            Learn to managing creative product
            at any scale with MyKaren
          </Typography.Title>
          <Typography.Text className="subTitle">
            Karen will always help you to manage your circle
          </Typography.Text>
          <div className="f mdl" style={{ marginTop: 45 }}>
            <Button size="large" type="primary" style={{ marginRight: 55 }}>Get Started</Button>
            <Link href="">
              <a className="link lined">Learn More</a>
            </Link>
          </div>
        </div>
        <div className="statistic">
          <div className="container f f-btw">
            <div className="statisticItem f f-c">
              <Typography.Title strong style={{ fontSize: 64, margin: 0 }}>5</Typography.Title>
              <Typography.Text style={{ fontSize: 18 }}>Registered Events</Typography.Text>
              <LineDecoration m="25px 0 0 0" c="#F72963" />
            </div>
            <div className="statisticItem f f-c mdl">
              <Typography.Title strong style={{ fontSize: 64, margin: 0 }}>122</Typography.Title>
              <Typography.Text style={{ fontSize: 18 }}>Registered Circle</Typography.Text>
              <LineDecoration m="25px 0 0 0" c="#D4F248" />
            </div>
            <div className="statisticItem f f-c f-end">
              <Typography.Title strong style={{ fontSize: 64, margin: 0 }}>2528</Typography.Title>
              <Typography.Text style={{ fontSize: 18 }}>Products</Typography.Text>
              <LineDecoration m="25px 0 0 0" c="#20CAEF" />
            </div>
          </div>
          <div className="container f f-ctr mdl" style={{ marginTop: 40 }}>
            <Button size="large">Browse Product</Button>
          </div>
        </div>
        <div className="features">
          <div className="container">
            <div className="f f-ctr mdl f-c">
              <Typography.Title level={1}>
                Bring your circle onto next level
            </Typography.Title>
              <Typography.Text className="subTitle">
                Karen will bring the most productive and profitable to your circle
            </Typography.Text>
              <br />
              <Link href="">
                <a className="link lined">Learn More</a>
              </Link>
            </div>

            <div className="f f-w" style={{ margin: '70px 0' }}>
              <div className="featureItem f mdl">
                <img src="/images/ciby/Repustasi_fs_c_r_star_1.png" />
                <div className="f f-c" style={{ marginLeft: 35 }}>
                  <Typography.Title level={4}>Reputation</Typography.Title>
                  <Typography.Text>Your circle member will receive reputation point every finishing the task you given.</Typography.Text>

                  <Link href="/">
                    <a>Explore Reputation</a>
                  </Link>
                </div>
              </div>
              <div className="featureItem f mdl">
                <img src="/images/ciby/marahtelat_c_r_final.png" />
                <div className="f f-c" style={{ marginLeft: 35 }}>
                  <Typography.Title level={4}>Timeline</Typography.Title>
                  <Typography.Text>You can create the timeline and deadline for every task you given.</Typography.Text>

                  <Link href="/">
                    <a>Explore Timeline</a>
                  </Link>
                </div>
              </div>
              <div className="featureItem f mdl">
                <img src="/images/ciby/stockchibi_c_r_final.png" />
                <div className="f f-c" style={{ marginLeft: 35 }}>
                  <Typography.Title level={4}>Item & Stocking</Typography.Title>
                  <Typography.Text>We will help you to count the stocking and sold item from event.</Typography.Text>

                  <Link href="/">
                    <a>Explore Item & Stocking</a>
                  </Link>
                </div>
              </div>
              <div className="featureItem f mdl">
                <img src="/images/ciby/Fandom_S_l_c_r.png" />
                <div className="f f-c" style={{ marginLeft: 35 }}>
                  <Typography.Title level={4}>Popular Fandom</Typography.Title>
                  <Typography.Text>We will help you to predict some popular fandom in day, week, and month.</Typography.Text>

                  <Link href="/">
                    <a>Explore Popular Fandom</a>
                  </Link>
                </div>
              </div>
            </div>



          </div>
        </div>
        <div className="copy">
          <div className="container f f-c f-ctr mdl">
            <Typography.Title level={1} style={{ fontWeight: 300, textAlign: 'center', color: '#fff' }}>
              Join the hundreds of people using <strong>MyKaren</strong> to make the products you love most
                </Typography.Title>
            <br />
            <Button size="large" ghost>Get Started</Button>
          </div>
        </div>
      </PublicLayout>
    </div>
  )
}

export default LandingPage