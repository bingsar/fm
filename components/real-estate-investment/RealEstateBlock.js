import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";

import returns from '/public/returns.jpg'
import diversification from '/public/diversifications.jpg'
import diversification2 from '/public/diversifications2.jpg'

import styles from '../../styles/realEstateInvestment.module.css'

export default function RealEstateBlock() {

    const matches = useMediaQuery('(min-width:768px)');

    return (
        <section className="container">
            { matches ? null :
                <div className={styles.breadcrumbs}>
                    <Link href="/"><a className="link">Home</a></Link>/ Real Estate Investment.
                </div>
            }
            <div className={styles.titles}>
                <div className={styles.title}>
                    Real estate investment.
                </div>
                <div className={styles.title}>
                    Grow and Protect Your Wealth with Real Estate.
                </div>
            </div>
            <div className={styles.subtitle}>
                F&M connects you with the best-in-class private real estate funds that invest in multifamily properties for accredited investors seeking income or appreciation.
            </div>
            <div className={styles.items}>
                <div className={styles.item}>
                    <div className={styles.image}>
                        <Image src={returns} />
                    </div>
                    <div className={styles.item__title}>
                        Higher Returns.
                    </div>
                    <div className={styles.item__text}>
                        Over the past 40 years, multifamily generated the highest average returns and generated the highest return per unit of risk, as compared to other real estate asset classes.
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.image}>
                        <Image src={diversification} />
                    </div>
                    <div className={styles.item__title}>
                        Diversification.
                    </div>
                    <div className={styles.item__text}>
                        Multifamily properties have a low return correlation to equities (0.17)
                        and bonds (-0.18)
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.image}>
                        <Image src={diversification2} />
                    </div>
                    <div className={styles.item__title}>
                        Diversification.
                    </div>
                    <div className={styles.item__text}>
                        Multifamily leases can reset at six, nine,
                        or 12 months offering an opportunity
                        to reprice rents as prices increase.
                    </div>
                </div>
            </div>
            <div className={styles.returns}>
                <div className={styles.returns__title}>
                    Average returns by real estate
                    property type.
                </div>
                <div className={styles.percents}>
                    <div className={styles.percent}>
                        <div className={styles.percent__title}>
                            multifumily
                        </div>
                        <div className={styles.line__wrap}>
                            <div className={`${styles.line} ${styles.multifumily}`}>
                                10.15%
                            </div>
                        </div>
                    </div>
                    <div className={styles.percent}>
                        <div className={styles.percent__title}>
                            industrial
                        </div>
                        <div className={styles.line__wrap}>
                            <div className={`${styles.line} ${styles.industrial}`}>
                                9.21%
                            </div>
                        </div>
                    </div>
                    <div className={styles.percent}>
                        <div className={styles.percent__title}>
                            retail
                        </div>
                        <div className={styles.line__wrap}>
                            <div className={`${styles.line} ${styles.retail}`}>
                                8.92%
                            </div>
                        </div>
                    </div>
                    <div className={styles.percent}>
                        <div className={styles.percent__title}>
                            office
                        </div>
                        <div className={styles.line__wrap}>
                            <div className={`${styles.line} ${styles.office}`}>
                                7.99%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {matches?
                <div className={styles.check}>
                    Check the best <span className={styles.underline}>real estate investment</span> options on the market.
                </div>
                :
                null
            }
        </section>
    )
}