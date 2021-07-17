import { useEffect, useState } from 'react'
import PublicLayout from 'components/Layout/PublicLayout'
import { withSession } from "lib/session"
import { RegisterForm } from "components/User/RegisterForm"
import { EmailConfirmation } from "components/User/EmailConfirmation"
import KarenParticle from 'components/Particle'
import css from 'styled-jsx/css'

const style = css.global`{
  .signContainer {
    max-width: 600px;
    width: 100%;
    margin: 150px auto 0;
  }
  .banner {
    background: var(--primaryColor);
    max-width: 382px;
    padding: 30px 45px;
  }
  .form {
    width: 450px; 
    padding: 45px 50px; 
    border-radius: 16px;
    box-shadow: 5px 5px 30px rgba(0,0,0,.1);
    background: #fff;
  }
}`



export default function RegisterPage() {
  const [isFinished, setIsFinished] = useState(false)
  const [email, setEmail] = useState("")
  useEffect(() => {
    document.title = 'Register | Combat'
  })
  return (
    <PublicLayout>
      <style jsx>{style}</style>
      <div style={{ position: 'absolute', zIndex: -1, opacity: .3, top: 0 }}>
        <KarenParticle height={556} />
      </div>
      <div className="signContainer f f-ctr">
        {!isFinished && <RegisterForm setEmail={setEmail} onFinish={() => setIsFinished(true)}/>}
        {isFinished && <EmailConfirmation email={email}/>}
      </div>
    </PublicLayout>
  )
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get("karen-user-data")
  if (res) {
    if (user) {
      await res.writeHead(302, { Location: "/dashboard" })
      await res.end()
    }
  }
  return {
    props: {}
  }
})