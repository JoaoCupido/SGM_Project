import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from "../comps/footer"
import Header from "../comps/header"
import Link from 'next/link'

// Fetching data from the JSON file
import fsPromises from 'fs/promises';
import path from 'path'
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'animalsData.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData
  }
}

export default function Home(props) {
  const animals = props.animals;
  const types = props.types;
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
          {types.map(type =>
            <div className={styles.card} key={type.id}>
              <h2>{type.name} &rarr;</h2>
              <p>
                {type.description}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer/>
    </div>
  )
}
