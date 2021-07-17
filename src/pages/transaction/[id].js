import { useEffect } from 'react'
import { withSession } from "lib/session"
import AppLayout from 'components/Layout/UserLayout'
import Details from 'components/Transaction/Details'

export default function DetailTransaction(props) {
  useEffect(() => {
    document.title = "Order | MyKaren"
  })
  return (
    <AppLayout>
      <div style={{ paddingLeft: 57, width: '100%' }}>
        <Details />
      </div>
    </AppLayout>
  )
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get("karen-user-data")
  if (res) {
    if (!user) {
      try {
        res.writeHead(302, { Location: "/login" })
        res.end()
      } catch {
        console.log('ERROR')
      }
    }
  }
  return {
    props: {}
  }
})
