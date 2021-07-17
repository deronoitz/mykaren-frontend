import { Button, Badge } from 'antd'
import Router from "next/router"
import Link from '../Link/Link'
export default function Header() {
  return (
    <React.Fragment>
      <style jsx>
        {`
          .headerPublic {
            background: #fff;
            height: 74px;
            border-bottom: solid 1px #ededed;
            z-index: 2;
            width: 100%;
            top: 74px;
            position: sticky;
          }
          .logo {
            margin-right: 30px
          }
          .menu li {
            margin: 0 20px;
          }
          .headerPublic :global(.signUpButton) {
            margin-left: 20px;
          }
        `}
      </style>
      <div className="headerPublic f mdl">
        <div className="container f f-btw mdl">
          <div>
            <a className='link'>CREATOR SUPER FEST 2021</a>
          </div>
          <div className="f mdl">
            <ul className="f menu" style={{ margin: 0 }}>

              <li>
                <a href='#guest-star' className="link">Guest Stars</a>
              </li>

              <li>
                <a href='#rundown' className="link">Rundown</a>
              </li>
              <li>
                <a href='#venue' className="link">Venue</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}
