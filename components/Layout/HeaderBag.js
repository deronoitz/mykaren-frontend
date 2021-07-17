import Router from "next/router"
import { ArrowRightOutlined } from '@ant-design/icons'
import Link from '../Link/Link'
import Context from 'hooks/bag'
export default function Header() {
  const { step, setStep } = Context.useContainer()
  return (
    <React.Fragment>
      <style jsx>
        {`
          .headerPublic {
            background: #fff;
            height: 74px;
            border-bottom: solid 1px #ededed;
            position: fixed;
            z-index: 2;
            width: 100%;
            top: 0;
          }
          .logo {
            margin-right: 50px
          }
          .menu li {
            margin: 0 20px;
          }
          .menu li.arrow {
            margin: 0;
          }
          .menu li:first-child {
            margin-left: 0
          }
          .headerPublic :global(.signUpButton) {
            margin-left: 20px;
          }
          .light {
            font-weight: 400!important;
            color: var(--contentColor)!important;
          }
        `}
      </style>
      <div className="headerPublic f mdl">
        <div className="container f f-btw mdl">
          <div className="f mdl">
            <Link href="/">
              <a>
                <img src="/karen-logo.svg" className="logo" />
              </a>
            </Link>
          </div>
          <div>
            <ul className="f menu" style={{ margin: 0 }}>
              <li>
                <a className="link" onClick={() => setStep(1)}>My Bag</a>
              </li>
              <li className='arrow'><ArrowRightOutlined /></li>
              <li>
                <a className={`link ${step < 2 && 'light'}`} onClick={() => setStep(2)}>Pick up & Payment</a>
              </li>
              <li className='arrow'><ArrowRightOutlined /></li>
              <li>
                <a className={`link ${step < 3 && 'light'}`} onClick={() => setStep(3)}>Done</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}
