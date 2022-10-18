import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/">
                <a
                    target="_self"
                    rel="noopener noreferrer"
                >
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                    Animal World
                </a>
            </Link>
            <Link href="/">
                <a className="btn btn-primary" role="button">Home</a>
            </Link>
            <Link href="/animals/">
                <a className="btn btn-primary" role="button">Animals</a>
            </Link>
            <Link href="/animals/">
                <a className="btn btn-primary" role="button"><i className={`${"bi bi-search"} ${styles["i"]}`}></i>Search</a>
            </Link>
        </header>
    )
}