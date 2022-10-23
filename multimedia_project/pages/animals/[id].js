import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Footer from "../../comps/footer";
import Header from "../../comps/header";
import Link from 'next/link'
import { useRouter } from 'next/router'

// Fetching data from the JSON file
import fsPromises from 'fs/promises';
import path from 'path'
export async function getStaticProps({params}) {
    const filePath = path.join(process.cwd(), 'animalsData.json');
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);

    let singleAnimalData = {};

    for (let i = 0; i < Object.keys(objectData.animals).length; i++)
    {
        if ((objectData.animals)[i].id === params.id) {
            singleAnimalData = (objectData.animals)[i];
            break;
        }
    }

    return {
        props: singleAnimalData
    }
}

export async function getStaticPaths() {
    const filePath = path.join(process.cwd(), 'allAnimals.json');
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);

    const paths = objectData.map(animal => {
        return { params: { id: animal }}
    })

    return {
        paths,
        fallback: false
    };
}

export default function Animal(props) {
    const router = useRouter()
    const { id } = router.query
    const { content } = "Charateristics of " + props.name;
    return (
        <div className={styles.container}>
            <Head>
                <title>Animal World | {props.name}</title>
                <meta name="description" content={content} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header/>

            <main>
                <div className={styles.container}>
                    <Head>
                        <title>{props.name}</title>
                    </Head>

                    <main className={styles.main}>
                        <h1 className={styles.title}>
                            {id}
                        </h1>

                        <Image src={((props.images)[0]).imagelink} width="300px" height="300px" alt={((props.images)[0]).alt}/>

                    </main>
                </div>
                )
            </main>

            <Footer/>
        </div>
    )
}
