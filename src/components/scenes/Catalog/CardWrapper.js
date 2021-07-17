import Card from './Card'
export default function CardWrapper({ data }) {
  return (
    <div className='container' style={{ marginTop: 40, paddingBottom: 70 }}>
      <div className='f f-w' style={{ margin: -15 }}>
        {data && data.map(i => <Card data={i} key={i.id} />)}
        {
          !data &&
          <>
          Loading...
            {/* <Card />
            <Card />
            <Card />
            <Card /> */}
          </>
        }
      </div>
    </div>
  )
}