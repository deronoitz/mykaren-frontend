import { createContainer } from "unstated-next"
import { useState } from "react"

function CircleContext(initialState = {}) {
  let [circle, setCircle] = useState(initialState)
  return {
    data: circle, 
    mutate: setCircle
  }
}

const Circle = createContainer(CircleContext)

export default Circle