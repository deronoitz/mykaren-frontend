import Head from 'next/head'
import GlobalVariable from './variableStyle'

export default function Layout({
  children,
  // title = 'Home | MyKaren'
}) {
  return (
    <div id="mykaren">
      <style jsx global>{GlobalVariable}</style>
      <Head>
        {/* <title>{title}</title> */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet"></link>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </div>
  )
}