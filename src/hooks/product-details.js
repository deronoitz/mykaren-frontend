import { createContainer } from 'unstated-next'
import { useState } from 'react'

const Context = createContainer(() => {
  const [data, setData] = useState(null)
  return { data, setData }
})

export default Context