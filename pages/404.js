import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React from "react";

export default function Error() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Animal World | Error 404</title>
                <meta name="description" content="Interactive and Fun Website for Kids!" />
                <link rel="icon" href="https://joaocupido.github.io/sgm_project/favicon.ico" />
            </Head>


            <main className={styles.main}>
                <h1 className={styles.title}>
                    404 - Page Not Found
                </h1>

                <p className={styles.description}>
                    Oops! We can&apos;t seem to find the page you&apos;re looking for!
                </p>

                <p>
                    <Link href="/">
                        <a className={`${"btn btn-lg btn-success me-2 mb-2"} ${styles["btn-primary"]}`} role="button">Back To Homepage</a>
                    </Link>
                </p>
            </main>

        </div>
    )
}