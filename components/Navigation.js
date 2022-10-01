import Image from "next/image";
import Link from "next/link";
import logo from '/public/logo_fm.svg'
import globus from '/public/globus.svg'

import styles from '../styles/navigation.module.css'

export default function Navigation() {
    return (
        <>
            <nav>
                <div className="container">
                    <div className={styles.top__menu}>
                        <Link href="/">
                            <div className={styles.logo__wrap}>
                                <Image src={logo}/>
                            </div>
                        </Link>
                        <div className={styles.country}>
                            <div className={styles.globus__icon}>
                                <Image src={globus} />
                            </div>
                            <select className={styles.select}>
                                <option>
                                    Georgia
                                </option>
                                <option>
                                    Turkey
                                </option>
                                <option>
                                    UAE
                                </option>
                            </select>
                        </div>
                        <div className={styles.catalog__btn}>
                            <div className={styles.catalog__text}>
                                Real estate catalogue
                            </div>
                            <div className={styles.catalog__icon}>

                            </div>
                        </div>
                        <div className={styles.menu__btn}>
                            Menu
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}