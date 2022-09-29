import Image from "next/image";
import hero2x from "../public/hero__banner2x.jpg"
import hero__mobile2x from "../public/hero__banner_mobile2x.jpg"
import useMediaQuery from '@mui/material/useMediaQuery'

import styles from "../styles/hero.module.css"

export default function Hero() {

    const matches = useMediaQuery('(min-width:768px)');

    return (
        <section className="container">
            <div className={styles.banner}>
                <div className={styles.hero__img}>
                    {matches ?   <Image  src={hero2x} priority={true} layout={"responsive"}/> : <Image  src={hero__mobile2x} layout={"responsive"}/>}
                </div>
                <div className={styles.title}>
                    invest profitably in luxury real estate.
                </div>
                {matches ? <div className={styles.subtitle}>We handpicked for you the best-in-class private real estate.</div> : null}
                <div className={styles.link}>
                    Discover the real estate catalog.
                </div>
            </div>
        </section>
    )
}