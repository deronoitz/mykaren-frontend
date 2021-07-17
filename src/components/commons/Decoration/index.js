function LineDecoration(props) {
  const { w, h, c, m} = props;
  return (
    <div style={{ 
      width: w ||90, 
      height: h || 5, 
      background: c || '#ccc', 
      margin: m || null,
      display: 'inline-block'
    }} />
  )
}

export { LineDecoration }