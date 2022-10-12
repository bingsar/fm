import styles from '../../styles/labels.module.css'

export default function Labels() {
    return(
        <section className="container">
            <div className={styles.label__title}>
                REAL ESTATE CATALOG.
            </div>
            <div className={styles.label__subtitle}>
                We handpicked for you the best-in-class private real estate properties in the market that combine high construction quality, the right location, and a high return on investment.
            </div>
            <div className={styles.labels}>
                <div className={styles.label}>
                    Apartments
                </div>
                <div className={styles.label}>
                    Villas
                </div>
                <div className={styles.label}>
                    Penthouses
                </div>
                <div className={styles.label}>
                    Houses
                </div>
                <div className={styles.label}>
                    Hotel Apartments
                </div>
            </div>
        </section>
    )
}