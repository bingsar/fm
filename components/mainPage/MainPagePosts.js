import Image from "next/image";
import Link from "next/link";
import inv_management from '../../public/posts__img/main_inv_managment.jpg'
import family from '../../public/posts__img/family.jpg'
import metal from '../../public/posts__img/metal.jpg'
import capital from '../../public/posts__img/capital.jpg'
import realEstate from '../../public/posts__img/realestate.jpg'
import { motion, useInView } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useEffect, useRef, useState} from "react";

import styles from "../../styles/mainPagePosts.module.css"
import useAppContext from "../../src/store";



export default function MainPagePosts({ post }) {
    const ref = useRef(null)
    const isInView = useInView(ref)

    const matches = useMediaQuery('(min-width: 768px)')
    const { showAnimation, setShowAnimation } =  useAppContext()
    const noAnimation = {}

    useEffect(() => {
        console.log("Element is in view: ", isInView)
    }, [isInView])

    const container = {
        start: { y: 1000 },
        finish: {
            y: 0,
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
            <motion.section
                variants={ container }
                initial={ showAnimation ? "start" : "finish"}
                animate="finish"
                onAnimationComplete={onComplete}
                className="container"
            >
                <motion.span
                    style={{
                        width: isInView? "100%" : "0",
                        transition: { duration: 1 },
                    }}
                    onAnimationComplete = { onComplete }
                    className={styles.border}
                />
                <motion.div className={styles.grid}>
                    <div ref={ref} className={styles.title}>
                        what we do?
                    </div>
                    <div className={styles.items}>
                        <div className={styles.item}>
                            <div className={styles.item__image}>
                                <Image placeholder="blur"  src={inv_management} layout={"responsive"} />
                            </div>
                            <div className={styles.item__title}>
                                Investment management.
                            </div>
                            <div className={styles.item__text}>
                                We deliver first-class advise and expertise
                                in current trends to help you to make right investment decisions with outstanding attention to your personal concerns
                                and goals.
                            </div>
                            <Link href="/investment-managment">
                                <div className={styles.item__btn}>
                                    <div className={styles.btn__text}>
                                        learn more
                                    </div>
                                    <div className={styles.btn__icon}>

                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.item__image}>
                                <Image placeholder="blur"  src={family} layout={"responsive"} />
                            </div>
                            <div className={styles.item__title}>
                                Family office.
                            </div>
                            <div className={styles.item__text}>
                                We develop tailored strategies
                                to encompasses all your family’s needs, effectively protect, growth and transfer your wealth across generations.
                            </div>
                            <Link href="/family-office">
                                <div className={styles.item__btn}>
                                    <div className={styles.btn__text}>
                                        learn more
                                    </div>
                                    <div className={styles.btn__icon}>

                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.item__image}>
                                <Image placeholder="blur"  src={metal} layout={"responsive"} />
                            </div>
                            <div className={styles.item__title}>
                                Precious metal services.
                            </div>
                            <div className={styles.item__text}>
                                We provide all services in the precious metals loop to private individuals – from recycling
                                to trading.
                            </div>
                            <Link href="/precious-metal-services">
                                <div className={styles.item__btn}>
                                    <div className={styles.btn__text}>
                                        learn more
                                    </div>
                                    <div className={styles.btn__icon}>

                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.item__image}>
                                <Image placeholder="blur"  src={capital} layout={"responsive"} />
                            </div>
                            <div className={styles.item__title}>
                                Capital migration.
                            </div>
                            <div className={styles.item__text}>
                                Our expertise and knowledge
                                of administration, compliance and regulations can help you reach personal and business interests.
                            </div>
                            <Link href="/capital-migration">
                                <div className={styles.item__btn}>
                                    <div className={styles.btn__text}>
                                        learn more
                                    </div>
                                    <div className={styles.btn__icon}>

                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.item__image}>
                                <Image placeholder="blur"  src={realEstate} layout={"responsive"} />
                            </div>
                            <div className={styles.item__title}>
                                Real estate investment.
                            </div>
                            <div className={styles.item__text}>
                                Using our expertise, we can help you to make the most of your real estate investments and ensure long-term growth potential.
                            </div>
                            <Link href="/real-estate-investment">
                                <div className={styles.item__btn}>
                                    <div className={styles.btn__text}>
                                        learn more
                                    </div>
                                    <div className={styles.btn__icon}>

                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </motion.section>
        )
    } else {
        return (
            <section className="container">
                <motion.span className={styles.border}/>
                <div className={styles.grid}>
                    <div className={styles.title}>
                        what we do?
                    </div>
                    <div className={styles.items}>
                        <div className={styles.item}>
                            <div className={styles.item__image}>
                                <Image placeholder="blur"  src={inv_management} layout={"responsive"} />
                            </div>
                            <div className={styles.item__title}>
                                Investment management.
                            </div>
                            <div className={styles.item__text}>
                                We deliver first-class advise and expertise
                                in current trends to help you to make right investment decisions with outstanding attention to your personal concerns
                                and goals.
                            </div>
                            <Link href="/investment-managment">
                                <div className={styles.item__btn}>
                                    <div className={styles.btn__text}>
                                        learn more
                                    </div>
                                    <div className={styles.btn__icon}>

                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.item__image}>
                                <Image placeholder="blur"  src={family} layout={"responsive"} />
                            </div>
                            <div className={styles.item__title}>
                                Family office.
                            </div>
                            <div className={styles.item__text}>
                                We develop tailored strategies
                                to encompasses all your family’s needs, effectively protect, growth and transfer your wealth across generations.
                            </div>
                            <Link href="/family-office">
                                <div className={styles.item__btn}>
                                    <div className={styles.btn__text}>
                                        learn more
                                    </div>
                                    <div className={styles.btn__icon}>

                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.item__image}>
                                <Image placeholder="blur"  src={metal} layout={"responsive"} />
                            </div>
                            <div className={styles.item__title}>
                                Precious metal services.
                            </div>
                            <div className={styles.item__text}>
                                We provide all services in the precious metals loop to private individuals – from recycling
                                to trading.
                            </div>
                            <Link href="/precious-metal-services">
                                <div className={styles.item__btn}>
                                    <div className={styles.btn__text}>
                                        learn more
                                    </div>
                                    <div className={styles.btn__icon}>

                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.item__image}>
                                <Image placeholder="blur"  src={capital} layout={"responsive"} />
                            </div>
                            <div className={styles.item__title}>
                                Capital migration.
                            </div>
                            <div className={styles.item__text}>
                                Our expertise and knowledge
                                of administration, compliance and regulations can help you reach personal and business interests.
                            </div>
                            <Link href="/capital-migration">
                                <div className={styles.item__btn}>
                                    <div className={styles.btn__text}>
                                        learn more
                                    </div>
                                    <div className={styles.btn__icon}>

                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.item__image}>
                                <Image placeholder="blur"  src={realEstate} layout={"responsive"} />
                            </div>
                            <div className={styles.item__title}>
                                Real estate investment.
                            </div>
                            <div className={styles.item__text}>
                                Using our expertise, we can help you to make the most of your real estate investments and ensure long-term growth potential.
                            </div>
                            <Link href="/real-estate-investment">
                                <div className={styles.item__btn}>
                                    <div className={styles.btn__text}>
                                        learn more
                                    </div>
                                    <div className={styles.btn__icon}>

                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}