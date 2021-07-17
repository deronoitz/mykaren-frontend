import { LineDecoration } from '../components/Decoration'
import KarenParticle from '../components/Particle'
import Rundown from 'components/Rundown'
import { useEffect } from 'react'
import Header from 'components/_EventOverview/Header'
import PublicLayout from '../components/Layout/PublicLayout'
import { Typography, Button } from 'antd'
import css from 'styled-jsx/css'
const style = css`
  .copy {
    background: var(--primaryColor);
    padding: 100px 0;
  }
  .logo {
    background: #5c0e39;
    padding: 50px;
    border-radius: 15px;
  }
  .guest {
    background: var(--primaryColor);
    padding: 70px 0;
    scroll-margin-top: 146px;
  }
  .guest-item {
    margin: 40px
  }
  .guest-item img {
    height: 200px;
    width: 200px;
    object-fit: cover;
  }

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
`

const rundownSaturay = [
  {
    time: '10:00',
    title: 'Gate Open'
  },
  {
    time: '10:15',
    title: 'Opening Performance'
  },
  {
    time: '10:30',
    title: 'Sambutan Kepala Sekolah'
  },
  {
    time: '10:40',
    title: 'MC'
  },
  {
    time: '10:50',
    title: 'Band Performance'
  },
  {
    time: '11:30',
    title: 'Product Showcase Siswa'
  },
  {
    time: '12:00',
    title: 'Guest Star Appearance 1'
  },
  {
    time: '13:00',
    title: 'Club Appearance'
  },
  {
    time: '13:30',
    title: 'Art Battle'
  },
  {
    time: '15:00',
    title: 'Band Performance 2'
  },
  {
    time: '15:30',
    title: 'Guest Talk Show'
  },
  {
    time: '16:10',
    title: 'Artfluencer: KAREN'
  },
  {
    time: '16:40',
    title: 'UMKM Showcase'
  },
  {
    time: '17:15',
    title: 'Guest Star Performance'
  },
  {
    time: '19:00',
    title: 'Gate Close'
  },
]
const rundownSunday = [
  {
    time: '10:00',
    title: 'Gate Open'
  },
  {
    time: '10:15',
    title: 'Opening Performance'
  },
  {
    time: '10:30',
    title: 'MC'
  },
  {
    time: '10:40',
    title: 'Guest Star Appearance 1'
  },
  {
    time: '10:50',
    title: 'Band Appearance'
  },
  {
    time: '11:30',
    title: 'Product Showcase Siswa'
  },
  {
    time: '12:00',
    title: 'Guest Star Appearance 2'
  },
  {
    time: '13:00',
    title: 'Club Performance '
  },
  {
    time: '13:30',
    title: 'Art Battle: FINAL'
  },
  {
    time: '15:00',
    title: 'Band Performance 2'
  },
  {
    time: '15:30',
    title: 'Guest Talk Show'
  },
  {
    time: '16:10',
    title: 'Artfluencer: LINDA'
  },
  {
    time: '16:45',
    title: 'Band Performance 3'
  },
  {
    time: '17:15',
    title: 'Guest Star Performance'
  },
  {
    time: '19:00',
    title: 'Gate Close'
  },
]

export default function EventOverview() {
  useEffect(() => {
    document.title = 'CREATOR SUPER FEST 2021 | Combat'
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
          <Typography.Title className='centered' level={1}>
            CREATOR SUPER FEST 2021
          </Typography.Title>
          <Typography.Text className="subTitle centered">
            Jakarta, 26 – 27 Oct 2021<br />
            10 AM – 9 PM<br />
            SMESCO Exhibition Hall
          </Typography.Text>
          <div className="f mdl f-ctr" style={{ marginTop: 45 }}>
            <Button size="large" type="primary">Explore Event</Button>
          </div>
        </div>

        <Header />

        <div style={{ padding: '140px 0' }}>
          <div className='container' style={{ padding: '0 100px' }}>
            <div className='f mdl f-btw'>
              <div>
                <Typography.Title level={2} style={{ fontWeight: 400 }}>
                  What is<br />
                  <span style={{ fontWeight: 600 }}>CREATOR SUPER FEST 2021</span>
                  ?
                </Typography.Title>
                <Typography.Text style={{ maxWidth: 500, display: 'block', fontSize: 16, lineHeight: 2, marginTop: 20 }}>
                  Laboris aliquip laborum proident excepteur. Officia sit ut cillum commodo eu irure cillum dolor nulla eiusmod. Exercitation laborum veniam id esse reprehenderit culpa ipsum dolor culpa voluptate eiusmod sunt incididunt.
                </Typography.Text>
              </div>
              <div className='logo'>
                <img src='https://creatorsuperfest.com/wp-content/uploads/2019/09/logo.png' style={{ maxWidth: 260 }} />
              </div>
            </div>
          </div>
        </div>

        <div className="statistic">
          <div className="container f f-btw">
            <div className="statisticItem f f-c">
              <Typography.Title strong style={{ fontSize: 64, margin: 0 }}>7</Typography.Title>
              <Typography.Text style={{ fontSize: 18 }}>Guest Stars</Typography.Text>
              <LineDecoration m="25px 0 0 0" c="#F72963" />
            </div>
            <div className="statisticItem f f-c mdl">
              <Typography.Title strong style={{ fontSize: 64, margin: 0 }}>122</Typography.Title>
              <Typography.Text style={{ fontSize: 18 }}>Registered Booth</Typography.Text>
              <LineDecoration m="25px 0 0 0" c="#D4F248" />
            </div>
            <div className="statisticItem f f-c f-end">
              <Typography.Title strong style={{ fontSize: 64, margin: 0 }}>2528</Typography.Title>
              <Typography.Text style={{ fontSize: 18 }}>Products</Typography.Text>
              <LineDecoration m="25px 0 0 0" c="#20CAEF" />
            </div>
          </div>
          <div className="container f f-ctr mdl" style={{ marginTop: 40 }}>
            <Button size="large">Explore Event Catalog</Button>
          </div>
        </div>


        <div className='guest' id='guest-star'>
          <Typography.Title className='centered' level={2} style={{ color: '#fff' }}>
            Guest Stars
          </Typography.Title>
          <div className='container f f-w f-ctr mdl'>
            <div className='guest-item f f-c f-ctr mdl'>
              <img src='https://creatorsuperfest.com/wp-content/uploads/2019/09/Lazurite-1080x1080.png' />
              <Typography.Text strong style={{ fontSize: 16, color: '#fff' }}>Lazurite</Typography.Text>
            </div>
            <div className='guest-item f f-c f-ctr mdl'>
              <img src='https://creatorsuperfest.com/wp-content/uploads/2019/09/Otagroove-1080x1080.png' />
              <Typography.Text strong style={{ fontSize: 16, color: '#fff' }}>Otagroove</Typography.Text>
            </div>
            <div className='guest-item f f-c f-ctr mdl'>
              <img src='https://creatorsuperfest.com/wp-content/uploads/2019/10/Rainych-1080x1080.png' />
              <Typography.Text strong style={{ fontSize: 16, color: '#fff' }}>Rainych</Typography.Text>
            </div>
            <div className='guest-item f f-c f-ctr mdl'>
              <img src='https://creatorsuperfest.com/wp-content/uploads/2019/09/REDSHiFT-1080x1080.png' />
              <Typography.Text strong style={{ fontSize: 16, color: '#fff' }}>REDSHiFT</Typography.Text>
            </div>
            <div className='guest-item f f-c f-ctr mdl'>
              <img src='https://creatorsuperfest.com/wp-content/uploads/2019/09/SOBA-1080x1080.png' />
              <Typography.Text strong style={{ fontSize: 16, color: '#fff' }}>SOBA</Typography.Text>
            </div>
            <div className='guest-item f f-c f-ctr mdl'>
              <img src='https://creatorsuperfest.com/wp-content/uploads/2019/09/WILDPARTY-1080x1080.png' />
              <Typography.Text strong style={{ fontSize: 16, color: '#fff' }}>WILDPARTY</Typography.Text>
            </div>
            <div className='guest-item f f-c f-ctr mdl'>
              <img src='https://creatorsuperfest.com/wp-content/uploads/2019/10/Nanairo-Symphony-1080x1080.png' />
              <Typography.Text strong style={{ fontSize: 16, color: '#fff' }}>Nanairo Symphony</Typography.Text>
            </div>
          </div>
        </div>

        <div className='container' style={{ padding: '70px 0', scrollMarginTop: 146 }} id='rundown'>
          <Typography.Title className='centered' level={2} style={{ marginBottom: 40 }}>
            Rundown
          </Typography.Title>
          <div className='f'>
            <Rundown day='SATURDAY' date='26.OCT.21' data={rundownSaturay} />
            <Rundown day='SUNDAY' date='27.OCT.21' data={rundownSunday} red />
          </div>
        </div>
        <div className='statistic' id='venue' style={{scrollMarginTop: 146}}>
          <div className='container' style={{ padding: '50px 0' }}>
            <Typography.Title className='centered' level={2} style={{ marginBottom: 40 }}>
              Venue
          </Typography.Title>
            <div className='f mdl'>
              <div style={{ width: '50%' }}>
                <Typography.Title level={3}>
                  SMESCO Exhibition Hall
              </Typography.Title>
                <Typography.Text style={{ fontSize: 16, display: 'block', maxWidth: '80%' }}>
                  Jl. Gatot Subroto No.kav. 94, RT.11/RW.3, Pancoran, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12780
              </Typography.Text>
              </div>
              <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.165765879775!2d106.83400501473204!3d-6.241872295481788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2d95edae3%3A0xd35803a2d4d1c223!2sSmesco%20Indonesia!5e0!3m2!1sen!2sid!4v1612708870730!5m2!1sen!2sid" width="600" height="400" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='container' style={{ padding: '30px 0' }}>
            <img src='/images/dump/footer.jpg' style={{ width: '100%' }} />
          </div>
        </div>
        <div className="copy">
          <div className="container f f-c f-ctr mdl">
            <Typography.Title level={1} style={{ fontWeight: 300, textAlign: 'center', color: '#fff' }}>
              Join the hundreds of people using <strong>Combat</strong> to make the products you love most
                </Typography.Title>
            <br />
            <Button size="large" ghost>Get Started</Button>
          </div>
        </div>

      </PublicLayout>
    </div>
  )
}
