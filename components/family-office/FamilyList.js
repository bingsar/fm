import Image from "next/image";
import assets from '../../public/familyAssets.jpg'
import wealth from '../../public/familyWealth.jpg'
import checkmark from '../../public/checkmark.svg'

import styles from '../../styles/familyList.module.css'


export default function FamilyList() {

    

    return (
        <div className="container">
            <section className={styles.lists}>
                <div className={styles.list}>
                    <div className={styles.title}>
                        Managing family assets.
                    </div>
                    <div className={styles.image}>
                        <Image src={assets} />
                    </div>
                    <div className={styles.items}>
                        <div className={styles.item}>
                            <div className={styles.checkmark}>
                                <Image src={checkmark} />
                            </div>
                            <div className={styles.item__title}>
                                Succession & Governance
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.checkmark}>
                                <Image src={checkmark} />
                            </div>
                            <div className={styles.item__title}>
                                Expert fiduciary
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.checkmark}>
                                <Image src={checkmark} />
                            </div>
                            <div className={styles.item__title}>
                                Family business advisory
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.checkmark}>
                                <Image src={checkmark} />
                            </div>
                            <div className={styles.item__title}>
                                Insurance services
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.checkmark}>
                                <Image src={checkmark} />
                            </div>
                            <div className={styles.item__title}>
                                Legal and tax advisory
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.checkmark}>
                                <Image src={checkmark} />
                            </div>
                            <div className={styles.item__title}>
                                Philanthropy
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.list}>
                    <div className={styles.title}>
                        Protecting family wealth.
                    </div>
                    <div className={styles.image}>
                        <Image src={wealth} />
                    </div>
                    <div className={styles.items}>
                        <div className={styles.item}>
                            <div className={styles.checkmark}>
                                <Image src={checkmark} />
                            </div>
                            <div className={styles.item__title}>
                                Investment
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.checkmark}>
                                <Image src={checkmark} />
                            </div>
                            <div className={styles.item__title}>
                                management
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.checkmark}>
                                <Image src={checkmark} />
                            </div>
                            <div className={styles.item__title}>
                                Corporate finance
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.checkmark}>
                                <Image src={checkmark} />
                            </div>
                            <div className={styles.item__title}>
                                Art management
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.checkmark}>
                                <Image src={checkmark} />
                            </div>
                            <div className={styles.item__title}>
                                Private equity
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.checkmark}>
                                <Image src={checkmark} />
                            </div>
                            <div className={styles.item__title}>
                                Consolidation and reporting
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.checkmark}>
                                <Image src={checkmark} />
                            </div>
                            <div className={styles.item__title}>
                                Real estate advisory
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}