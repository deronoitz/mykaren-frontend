import Header from './HeaderBag'

export default function PublicLayout({children}){
  return (
    <React.Fragment>
      <Header />
      <div style={{marginTop: 75}}>

      </div>
      {children}
    </React.Fragment>
  )
}