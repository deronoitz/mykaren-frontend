import { createContainer } from 'unstated-next'
import { useState } from 'react'

export const CreateProductContext = createContainer(() => {
  const [step, setStep] = useState(1)
  return {
    step, setStep
  }
})