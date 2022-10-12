import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from "../comps/footer"
import Header from "../comps/header"
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Animal World | Homepage</title>
        <meta name="description" content="Interactive and Fun Website for Kids!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/">
          <a>Animal World!</a>
          </Link>
        </h1>

        <p className={styles.description}>
          Click on the button below to start choosing an animal!
        </p>

        <Link href="/animals/">
          <a className="btn btn-primary btn-lg" role="button">Choose an animal!</a>
        </Link>

        <br/>
        <br/>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>For Kids!</h2>
            <p>Images, videos and even 3D models to interact with!</p>
          </div>

          <div className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </div>

          <div className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </div>

          <div className={styles.card}>
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  )
}
