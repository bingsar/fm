import Image from "next/image";
import strategy from '../../public/strategy.jpg'
import implementation from '../../public/implementation.jpg'
import risk from '../../public/risk.jpg'
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from '../../styles/investmentBlock.module.css'
import Link from "next/link";


export default function InvestmentBlock() {

    

    const matches = useMediaQuery('(min-width:768px)');

    return (
        <section className="container">
            { matches ? null :
                <div className={styles.breadcrumbs}>
                    <Link href="/"><a className="link">Home</a></Link>/ Investment Managment.
                </div>
            }
            <div className={styles.title}>
                Investment management.
            </div>
            <div className={styles.subtitle}>
                We develop investment solutions based on current trends and let your funds always have the best opportunity to grow.
                Our approach to investment management isn’t just about building a portfolio, but also the regular analysis of the current world situation
                and quick response to your needs.
            </div>
            <div className={styles.items}>
                <div className={styles.fullwidth__item}>
                    <div className={styles.fullwidth__image}>
                        <Image src={strategy} layout={"responsive"}/>
                    </div>
                    <div className={`${styles.fullwidth__text} ${styles.text}`}>
                        Designing your investment strategy { matches ? <br /> : null }
                        and asset preferences.
                    </div>
                </div>
                <div className={styles.two__columns}>
                    <div className={styles.column}>
                        <div className={styles.column__image}>
                            <Image src={implementation} layout={"responsive"}/>
                        </div>
                        <div className={`${styles.column__text} ${styles.text}`}>
                            Implementation of the investment decisions
                            in the manner best suited to reach your goals whilst minimizing the total costs.
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.column__image}>
                            <Image src={risk} layout={"responsive"}/>
                        </div>
                        <div className={`${styles.column__text} ${styles.text}`}>
                            Risk management and a balanced approach to profit.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}