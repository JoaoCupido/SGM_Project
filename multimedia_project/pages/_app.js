import Head from 'next/head'
import '../styles/globals.css'

// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
// add bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// own css files here
// import "../css/customcss.css";

function MyApp({ Component, pageProps }) {
  return (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Component {...pageProps} />
  </>)
}

export default MyApp
