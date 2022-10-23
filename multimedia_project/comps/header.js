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
                    className="text-center"
                >
                    <span className={styles.logo}>
                        <Image src="/logoTitle.png" alt="Animal World Logo" width={503*0.9} height={90*0.9} />
                    </span>
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