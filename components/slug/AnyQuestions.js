import styles from '/styles/anyQuestions.module.css'

export default function AnyQuestions() {
    return (
        <div className={styles.questions}>
            <div className={styles.title}>
                any other
                questions?
            </div>
            <div className={styles.form__wrap}>
                <form action="" className={styles.form}>
                    <input className={styles.form__name} placeholder={"Name"} type="text"/>
                    <input className={styles.form__phone} placeholder={"Phone"} type="tel"/>
                    <button className={styles.btn}>
                        <div className={styles.btn__text}>call me</div>
                        <div className={styles.btn__icon}>

                        </div>
                    </button>
                    <div className={styles.privacy}>
                        <input type="checkbox" className={styles.checkbox} required={true}/>
                        <div className={styles.text}>I have read the <span className={styles.link}>privacy policy</span></div>
                    </div>
                </form>
            </div>
        </div>
    )
}