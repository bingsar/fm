import Image from "next/image";
import Link from "next/link";
import inv_management from '../../public/posts__img/main_inv_managment.jpg'
import family from '../../public/posts__img/family.jpg'
import metal from '../../public/posts__img/metal.jpg'
import capital from '../../public/posts__img/capital.jpg'
import realEstate from '../../public/posts__img/realestate.jpg'
import { motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useInView } from 'react-intersection-observer';

import styles from "../../styles/mainPagePosts.module.css"
import useAppContext from "../../src/store";




export default function MainPagePosts({ post }) {


    const { ref, inView, entry } = useInView({
        /* Optional options */
        triggerOnce: true,
        threshold: 0,
    });


    const matches = useMediaQuery('(min-width: 768px)')
    const { showAnimation, setShowAnimation } =  useAppContext()
    const noAnimation = {}

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
                ref={ref}
                variants={ container }
                initial={ showAnimation ? "start" : "finish"}
                animate="finish"
                onAnimationComplete={onComplete}
                className="container"
            >
                <span
                    style={{
                        width: inView ? "100%" : "0",
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                    }}
                    className={styles.border}
                />
                <div className={styles.grid}>
                    <div className={styles.title__wrap} ref={ref}>
                        <div
                            className={styles.title}
                        >
                            <div
                                style={{
                                    height: inView ? "0" : "100%",
                                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                                    transitionDelay: "1s"
                                }}
                                className={styles.title__overflow}
                            />
                            what
                        </div>
                        <div
                            className={styles.title}
                        >
                            <div
                                style={{
                                    height: inView ? "0" : "100%",
                                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                                    transitionDelay: "1s"
                                }}
                                className={styles.title__overflow}
                            />
                            we do?
                        </div>
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
            </motion.section>
        )
    } else {
        return (
            <section className="container">
                <motion.span className={styles.border}/>
                <div className={styles.grid}>
                    <div className={styles.title__wrap}>
                        <div ref={ref} className={styles.title}>
                            what&nbsp;
                        </div>
                        <div className={styles.title}>
                            we do?
                        </div>
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

