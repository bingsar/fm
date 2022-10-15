import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import tailored from '/public/tailored.jpg'
import progressive from '/public/progressive.jpg'
import transparent from '/public/transparent.jpg'
import Link from "next/link";

import styles from '/styles/aboutUs.module.css'



export default function AboutUsBlock() {

    

    const matches = useMediaQuery('(min-width:768px)');

    return (
        <section className="container">
            { matches ? null :
                <div className={styles.breadcrumbs}>
                    <Link href="/"><a className="link">Home</a></Link>/ About Us.
                </div>
            }
            <div className={styles.title}>
                our mission is the constant growth of your wealth.
            </div>
            <div className={styles.subtitle}>
                We provide wealth management advice to institutions and individuals around the world. Our professionals apply intimate knowledge across regions, sectors, and asset classes to curate bespoke solutions and strategies for each client. Every step of the way, we help you make informed decisions
                to manage and grow your assets and wealth.
            </div>
            <div className={styles.about}>
                <div className={styles.about__title}>
                    about
                    us
                </div>
                <div className={styles.column}>
                    <div className={styles.item}>
                        <div className={styles.image}>
                            <Image src={tailored} />
                        </div>
                        <div className={styles.item__title}>
                            Tailored.
                        </div>
                        <div className={styles.item__text}>
                            We understand that your values, needs, and goals are unique and create strategies with accurate attention
                            to your aspirations.
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.image}>
                            <Image src={progressive} />
                        </div>
                        <div className={styles.item__title}>
                            Progressive.
                        </div>
                        <div className={styles.item__text}>
                            We constantly keep an eye on new and emerging trends to offer you the best opportunities for growth, whether
                            it comes to management of classic
                            or digital asssets.
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.image}>
                            <Image src={transparent} />
                        </div>
                        <div className={styles.item__title}>
                            Transparent.
                        </div>
                        <div className={styles.item__text}>
                            Knowing from inside and out is the key to make the right decision. We provide you with in-depth insights on all challenges and risks you may have with a strategy.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}