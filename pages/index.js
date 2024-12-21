import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

// Fetching data from the JSON file
import fsPromises from 'fs/promises';
import path from 'path'
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'typesData.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData
  }
}

export default function Home(props) {
  const types = props.types;
  return (
    <div className={styles.container}>
      <Head>
        <title>Animal World | Homepage</title>
        <meta name="description" content="Interactive and Fun Website for Kids!" />
        <link rel="icon" href="https://joaocupido.github.io/sgm_project/favicon.ico" />
      </Head>


      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link legacyBehavior href="/">
          <a>Animal World!</a>
          </Link>
        </h1>

        <p className={styles.description}>
          Choose a category below to start choosing your favourite animal!
        </p>

        <div className={styles.grid}>
          {types.map(type =>
            <div key={type.id}>
              <Link legacyBehavior href={{ pathname: type.url, query: type.query }}>
                <div className={styles.card}>
                  <h2>{type.name} &rarr;</h2>
                  <p>
                    {type.description}
                  </p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </main>

    </div>
  )
}
