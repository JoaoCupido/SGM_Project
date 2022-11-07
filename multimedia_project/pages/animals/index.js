import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import sortBy from 'sort-by';

// Fetching data from the JSON file
import fsPromises from 'fs/promises';
import path from 'path';
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'animalsData.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData
  }
}

export function objectPosition(animalId)
{
    let objectPosition = "object-position-0";

    if(animalId === "dog")
    {
        objectPosition = "object-position-1";
    }

    return objectPosition;
}

export default function Animals(props) {
  const animals = props.animals;
  animals.sort(sortBy('name','id'));

  return (
    <div className={styles.container}>
      <Head>
        <title>Animal World | List</title>
        <meta name="description" content="A list of animals to search for and filter." />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <main>


        <div className={styles.photoGallery}>
          {animals.map(animal =>
              <div key={animal.id}>
                <Link href={animal.url}>
                    <div className={styles.animalCard}>
                        <Image id={objectPosition(animal.id)} src={((animal.first_image)[0]).imagelink} alt={((animal.first_image)[0]).alt} width={240} height={240} className={styles.grow}/>
                        <h2>{animal.name}</h2>
                    </div>
                </Link>
              </div>
          )}
        </div>
      </main>


    </div>
  )
}
