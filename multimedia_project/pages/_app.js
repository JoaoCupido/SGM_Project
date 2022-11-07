import Head from 'next/head'
import '../styles/globals.css'

// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
// add bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// own css files here
import '../styles/dynamicAnimalList.css'

import { ScrollToTop } from 'react-simple-scroll-up'
import Layout from '../comps/Layout'

function MyApp({ Component, pageProps }) {
  return (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div className='App'>
      <ScrollToTop />
    </div>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    
  </>)
}

export default MyApp
