import { useEffect } from "react"
import { withSession } from "lib/session"
import Context from "hooks/circle"
import CircleLayout from "components/Layout/CircleLayout"
import Order from 'components/_Circle/Order'

export default function Circle(props) {
  useEffect(() => {
    document.title = `${props.circle?.name} | MyKaren`
  })
  return (
    <CircleLayout>
      <Context.Provider initialState={props.circle}>
        <Order />
      </Context.Provider>
    </CircleLayout>
  )
}

export const getServerSideProps = withSession(async ({ req, res, query }) => {
  const user = req.session.get('karen-user-data')
  const { id } = query
  let circle
  if (res) {
    if (!user) {
      res.writeHead(302, { Location: "/login" })
      res.end()
    } else {
      circle = await fetch(`${process.env.API_URL}/circles?url=${id}&members_in=${user.user.id}`, {
        method: 'get',
        headers: {
          ["Content-Type"]: "application/json",
          ["Authorization"]: `Bearer ${user.jwt}`
        },
      })
        .then(res => res.json())
      if (circle.length === 0) {
        console.log(circle.length === 0, "INI COUNT CIRCLE")
        res.writeHead(301, { Location: "/dashboard" })
        res.end()
      }
    }
  }
  return {
    props: {
      circle: circle?.[0] || []
    }
  }
})