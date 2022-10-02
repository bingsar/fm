import Image from "next/image";
import arrow__white from '/public/arrow__white.svg'

import styles from '/styles/filterSidebar.module.css'

export default function FilterSidebar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.country__fiter}>
                <div className={styles.country__title}>
                    country
                </div>
                <div className={styles.country__clear}>
                    Clear
                </div>
                <div className={styles.country__icon}>
                    <Image src={arrow__white} />
                </div>
            </div>
        </div>
    )
}