import BagLayout from 'components/Layout/BagLayout'
import Bag from 'components/_Bag'
import Context from 'hooks/bag'
import { useEffect } from 'react'
export default function BagPage() {
  useEffect(() => {
    document.title = 'Bag | MyKaren'
  })
  return (
    <Context.Provider>
      <BagLayout>
        <Bag />
      </BagLayout>
    </Context.Provider>
  )
}
