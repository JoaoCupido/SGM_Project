import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Footer from "../../comps/footer";
import Header from "../../comps/header";
import Link from 'next/link';
import React from "react";
import {SceneLoader} from "babylonjs";
import BabylonScene from "../../comps/BabylonScene";
import "babylonjs-loaders";

// Fetching data from the JSON file
import fsPromises from 'fs/promises';
import path from 'path'
import {CubeTexture} from "@babylonjs/core";

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

const onSceneReady = (scene) => {
    scene.createDefaultCamera(true);

    SceneLoader.ShowLoadingScreen = false;
    SceneLoader.Append(
        "/models/",
        "dog.babylon",
        scene,
        (meshes) => {
            scene.activeCamera = meshes.cameras[1];
            scene.activeCamera.attachControl(false);
            scene.createDefaultLight(true);
        }
    );

    return scene;
};

/**
 * Will run on every frame render.
 */
const onRender = (scene) => {};

export function hasVideo(video, animalId)
{
    if(video !== false)
    {
        const source = "/videos/" + animalId + ".mp4";
        return (
            <video width="44%" controls className={`${"pb-2 pl-2"}`}>
                <source src={source} type="video/mp4"/>
                Your browser does not support HTML video.
            </video>
        )
    }
    else
    {
        return (
            <br/>
        )
    }
}

export default function Animal(props) {
    const { content } = "Characteristics of " + props.name;
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
                    <main className={styles.main}>
                        <h1 className={styles.title}>
                            {props.name}
                        </h1>

                        <br/>
                        <br/>

                        <div className={styles.animGrid}>
                            <div className={`${"pl-10 pr-10 pb-2"}`}>
                                <img src={((props.first_image)[0]).imagelink} alt={((props.first_image)[0]).alt} width={800}/>
                            </div>
                            <div className={`${"pl-10 pr-10 pb-2"}`}>
                                <p className={`${styles["description"]}`}>
                                    - Type: {props.type}<br/>
                                    - Diet: {props.diet}<br/>
                                    - Tame: {props.tamed}
                                </p>
                            </div>

                            <div className={`${"pl-10 pr-10 pb-2"}`}>
                                <p className={`${styles["description"]}`}>
                                    - Type of habitat: {props.habitat}<br/>
                                    - Locations: {props.locations}<br/><br/>
                                    Fun Fact!<br/>{props.fun_fact}
                                </p>
                            </div>
                            <div className={`${"pl-10 pr-10 pb-2"}`}>
                                <img src={((props.second_image)[0]).imagelink} alt={((props.second_image)[0]).alt} width={800}/>
                            </div>

                            <BabylonScene antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
                            { hasVideo(props.video, props.id) }


                        </div>

                    </main>
                </div>

                <p>
                    <Link href="/animals/">
                        <a className="btn btn-primary" role="button">&larr; Back to Animal List</a>
                    </Link>
                </p>
            </main>

            <Footer/>
        </div>
    )
}
