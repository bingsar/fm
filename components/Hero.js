import useMediaQuery from '@mui/material/useMediaQuery'
import Image from "next/image";
import hero2x from "../public/hero__banner2x.jpg"
import hero__mobile2x from "../public/hero__banner_mobile2x.jpg"
import {motion} from "framer-motion";

import styles from "../styles/hero.module.css"
import useAppContext from "../src/store";

export default function Hero() {

    const matches = useMediaQuery('(min-width:768px)');

    const { showAnimation, setShowAnimation } =  useAppContext()


    const noAnimation = {}

    const image = {
        start: { y: '200px', width: '410px', height: '365px'},
        finish: {
            y: '0',
            width: '100%',
            height: '300px',
            transition: {
                delay: .8,
                duration: .8
            }
        },
    }

    const title = {
        start: { y: '400px', fontSize: '67px', lineHeight: '67px' },
        finish: {
            y: '0', fontSize: '110px', lineHeight: '110px',
            transition: {
                delay: .8,
                duration: .8
            }
        },
    }

    const subtitle = {
        start: { y: '400px' },
        finish: {
            y: '0',
            transition: {
                delay: .8,
                duration: .8
            }
        },
    }
    const text = {
        start: { y: '415px' },
        finish: {
            y: '0',
            transition: {
                delay: .8,
                duration: .8
            }
        },
    }

    function onComplete() {
        setShowAnimation(false)
    }

    if (matches) {
        return (
            <section className="container">
                <div className={styles.banner}>
                    <motion.div
                        variants={ matches ? image : noAnimation }
                        initial={ showAnimation ? "start" : "finish"}
                        animate="finish"
                        onAnimationComplete={onComplete}
                        className={styles.hero__img}
                    >
                        { matches ? <Image src={hero2x} priority={true} placeholder="blur" layout={"responsive"}/> : <Image  src={hero__mobile2x} layout={"responsive"}/>}
                    </motion.div>
                    <motion.div
                        variants={ matches ? title : noAnimation }
                        initial={ showAnimation ? "start" : "finish"}
                        animate="finish"
                        onAnimationComplete={onComplete}
                        className={styles.title}
                    >
                        invest profitably<br /> in luxury real estate.
                    </motion.div>
                    { matches ? <motion.div
                        variants={ subtitle }
                        initial={ showAnimation ? "start" : "finish"}
                        animate="finish"
                        onAnimationComplete={onComplete}
                        className={styles.subtitle}
                    >We handpicked for you the best-in-class private real estate.</motion.div> : null}
                    <motion.div
                        variants={ matches ? text : noAnimation }
                        initial={ showAnimation ? "start" : "finish"}
                        animate="finish"
                        onAnimationComplete={onComplete}
                        className={styles.link}
                    >
                        Discover the real estate catalog.
                    </motion.div>
                </div>
            </section>
        )
    } else {
        return (
            <section className="container">
                <div className={styles.banner}>
                    <div className={styles.hero__img}>
                        { matches ? <Image src={hero2x} priority={true} placeholder="blur" layout={"responsive"}/> : <Image  src={hero__mobile2x} layout={"responsive"}/>}
                    </div>
                    <div className={styles.title}>invest profitably<br /> in luxury real estate.
                    </div>
                    { matches ? <div className={styles.subtitle}>We handpicked for you the best-in-class private real estate.</div> : null}
                    <div className={styles.link}>
                        Discover the real estate catalog.
                    </div>
                </div>
            </section>
        )
    }


}