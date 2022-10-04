import styles from '/styles/nearBy.module.css'

export default function NearBy({ product }) {
    return (
        <div className={styles.near}>
            <div className={styles.title}>
                Near the object.
            </div>
            <div className={styles.slider}>

            </div>
        </div>
    )
}