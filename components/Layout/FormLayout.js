import Header from './HeaderPublic'
export default function FormLayout({ children }) {
  return (
    <React.Fragment>
      <div
        style={{
          // background: '#f9f9f9',
          minHeight: '100vh',
          backgroundImage: 'url(/images/bg-overlay.svg)',
          backgroundPosition: 'bottom',
          backgroundSize: 'cover'
        }}
      >
        <Header />
        <div style={{ marginTop: 75 }} />
        <div className="container">
          {/* <Breadcrumb /> */}
          <div className="f f-ctr mdl" style={{ paddingTop: 30 }}>
            {children}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}