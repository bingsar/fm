import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import styles from '../../styles/familyHero.module.css'

export default function FamilyHero() {

    const matches = useMediaQuery('(min-width:768px)');

    return (
        <section>
            <div className="container">
                { matches ? null :
                    <div className={styles.breadcrumbs}>
                        <Link href="/"><a className="link">Home</a></Link>/ Family office
                    </div>
                }
                <div className={styles.title}>
                    Family office.
                </div>
                <div className={`${styles.title} ${styles.second__title}`}>
                    Protecting and increasing your family wealth is our top priority.
                </div>
                <div className={styles.subtitle}>
                    Our bespoke investment and financial solutions are here to enhance your family's asset allocation, protect your wealth, develop and pass it to the next generations.
                </div>
            </div>
        </section>
    )
}