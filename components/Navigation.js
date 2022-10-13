import Image from "next/image";
import Link from "next/link";
import logo from '/public/logo_fm.svg'
import globus from '/public/globus.svg'

import styles from '../styles/navigation.module.css'
import {useEffect, useState} from "react";
import useAppContext from "../src/store";

export default function Navigation() {

    const { setCtxCountry, ctxCountry } =  useAppContext()

    const handleChange = (e) => {
        setCtxCountry(e.target.value);
    };

    useEffect(() => {
        setCtxCountry(parseInt(ctxCountry))
    },[])

    let country = useAppContext()?.state?.stages?.productCategories

    const [isOpen, setIsOpen] = useState(false)
    const countryCategoryId = 31
    function openHandler() {
        setIsOpen(!isOpen)
    }

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
                                <Image src={globus}/>
                            </div>
                            <select className={styles.select} onChange={handleChange}>
                                { country?.edges.map((country, index) => {
                                    if (country.node.parentDatabaseId === countryCategoryId) {
                                        return <option key={index} selected={ctxCountry===country.node.databaseId? ctxCountry : null} value={country.node.databaseId}>
                                            {country.node.name}
                                        </option>
                                    }
                                }) }
                            </select>
                        </div>
                        <Link href="/catalog">
                            <div className={styles.catalog__btn}>
                                <div className={styles.catalog__text}>
                                    Real estate catalogue
                                </div>
                                <div className={styles.catalog__icon}>

                                </div>
                            </div>
                        </Link>
                        <div className={styles.menu__btn} onClick={() => openHandler()}>
                            Menu
                        </div>
                    </div>
                </div>
                { isOpen ? <>
                        <div className={styles.menuContainer}>
                            <div className={styles.menu__close} onClick={() => openHandler()}>Close</div>
                            <div className={styles.menu__items}>
                                <Link href="/family-office">
                                    <div className={styles.menu__item}>
                                        Family office.
                                    </div>
                                </Link>
                                <Link href="/investment-managment">
                                    <div className={styles.menu__item}>
                                        Investment management.
                                    </div>
                                </Link>
                                <Link href="/capital-migration">
                                    <div className={styles.menu__item}>
                                        capital migration.
                                    </div>
                                </Link>
                                <Link href="/real-estate-investment">
                                    <div className={styles.menu__item}>
                                        Real estate investment.
                                    </div>
                                </Link>
                                <Link href="/precious-metal-services">
                                    <div className={styles.menu__item}>
                                        Precious metal services.
                                    </div>
                                </Link>
                                <Link href="/catalog">
                                    <div className={styles.menu__item}>
                                        REAL ESTATE CATALOG.
                                    </div>
                                </Link>
                                <Link href="/about-us">
                                    <div className={styles.menu__item}>
                                        About us.
                                    </div>
                                </Link>
                                <Link href="/contact">
                                    <div className={styles.menu__item}>
                                        Contact us
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </>
                    :
                    null
                }
            </nav>
        </>
    )
}