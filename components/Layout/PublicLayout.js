import HeaderPublic from './HeaderPublic'
import BagContext from 'hooks/bag'
export default function PublicLayout({ children }) {
  return (
    <React.Fragment>
      <BagContext.Provider>
        <HeaderPublic />
        <div style={{ marginTop: 75 }} />
        {children}
      </BagContext.Provider>
    </React.Fragment>
  )
}