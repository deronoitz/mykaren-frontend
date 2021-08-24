import { createContainer } from 'unstated-next'
import { useState } from 'react'
const Context = createContainer(() => {
  const [step, setStep] = useState(1)
  const [data, setData] = useState([])
  const [total, setTotal] = useState([])
  const [cartId, setCartId] = useState(null)
  return {
    step, setStep,
    data, setData,
    total, setTotal,
    cartId, setCartId
  }
})

export default Context