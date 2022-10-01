import Image from "next/image";
import selection from '../../public/selection.jpg'
import advice from '../../public/advice.jpg'
import assistance from '../../public/assistance.jpg'
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from '../../styles/capitalBlock.module.css'
import Link from "next/link";

export default function CapitalBlock() {

    const matches = useMediaQuery('(min-width:768px)');

    return (
        <section className="container">
            { matches ? null :
                <div className={styles.breadcrumbs}>
                    <Link href="/"><a className="link">Home</a></Link>/ Capital Migration.
                </div>
            }
            <div className={styles.titles}>
                <div className={styles.title}>
                    Capital Migration.
                </div>
                <div className={styles.title}>
                    Creating a solid base for the safety and growth
                    of your assets.
                </div>
            </div>
            <div className={styles.subtitle}>
                Our experience allows us to advise you on the best jurisdiction for the migration
                of your capital, as well as to help with the implementation of your wealth tasks from start to finish.
                Through our network and reputation, we have unparalleled access to deal flow, reliable intelligence, and research which coupled with our experience allows us to source attractive opportunities and execute them via the most suitable instruments.<br/>
                Our experts provide independent advice to shareholders and companies at every stage of capital migration.
            </div>
            <div className={styles.items}>
                <div className={styles.fullwidth__item}>
                    <div className={styles.fullwidth__image}>
                        <Image src={selection} layout={"responsive"}/>
                    </div>
                    <div className={`${styles.fullwidth__text} ${styles.text}`}>
                        Selection of the right jurisdiction for your capital.
                    </div>
                </div>
                <div className={styles.two__columns}>
                    <div className={styles.column}>
                        <div className={styles.column__image}>
                            <Image src={advice} layout={"responsive"}/>
                        </div>
                        <div className={`${styles.column__text} ${styles.text}`}>
                            Advice at every stage of capital migration.
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.column__image}>
                            <Image src={assistance} layout={"responsive"}/>
                        </div>
                        <div className={`${styles.column__text} ${styles.text}`}>
                            Assistance across the entire capital{matches ? <br/> : null}
                            migration process.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}