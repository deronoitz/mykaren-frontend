import { withRouter } from 'next/router'
import Link from 'next/link'
import _ from "lodash"
import React, { Children } from 'react'

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children)
  const { pathname } = router
  const parent = `/${_.filter(pathname.split("/"), i => i !== "")[0]}`
  let className = child.props.className || null
  if (router.pathname === props.href || parent === props.href && props.activeClassName) {
    className = `${className !== null ? className : ''} ${props.activeClassName}`.trim()
  }
  delete props.activeClassName

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)