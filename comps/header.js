import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg" style={{background: "linear-gradient(180deg, rgba(38,154,55,0.9) 0%, rgba(73,128,31,0.9) 95%, rgba(253,255,0,0) 100%)"}}>
                <div className="container-fluid">
                    <Link legacyBehavior href="/">
                        <a className="navbar-brand">
                            <Image className="d-inline-block align-text-top" src="https://joaocupido.github.io/sgm_project/logoTitle.png" alt="Animal World Logo" width={503*0.9} height={90*0.9} />
                        </a>
                    </Link>
                    <div className="navbar-nav navbar-collapse">
                        <Link legacyBehavior href="/">
                            <a className={`${"btn btn-lg btn-success me-2 mb-2"} ${styles["btn-primary"]}`} role="button"><i className={`${"bi bi-house-door"} ${styles["i"]}`}></i>Home</a>
                        </Link>
                        <Link legacyBehavior href="/animals/">
                            <a className={`${"btn btn-lg btn-success me-2 mb-2"} ${styles["btn-primary"]}`} role="button"><i className={`${"bi bi-list"} ${styles["i"]}`}></i>Animals</a>
                        </Link>
                        <Link legacyBehavior href="/animals/">
                            <a className={`${"btn btn-lg btn-success me-2 mb-2"} ${styles["btn-primary"]}`} role="button"><i className={`${"bi bi-search"} ${styles["i"]}`}></i>Search</a>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}