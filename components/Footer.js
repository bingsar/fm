import Image from "next/image";
import logo__white from "../public/logo__white.svg"
import styles from '../styles/footer.module.css'
import useAppContext from "../src/store";

export default function Footer () {

    

    return (
        <footer>
            <div className={styles.container}>
                <div className={styles.contact__wrap}>
                    <div className={styles.contact}>
                        <div className={styles.logo}>
                            <div className={styles.logo__white}>
                                <Image src={logo__white}/>
                            </div>
                            <div className={styles.logo__text}>
                                Minkh Capital
                            </div>
                        </div>
                        <div className={styles.title}>
                            contact us
                        </div>
                        <div className={styles.subtitle}>
                            We are glad to receive your request. Leave a message and we will get in touch with you shortly.
                        </div>
                    </div>
                    <div className={styles.form}>
                        <form action="">
                            <input className={styles.input__item} required type="text" placeholder={"Name"}/>
                            <input className={styles.input__item} type="tel" placeholder={"Phone"}/>
                            <input className={styles.input__item} required type="email" placeholder={"E-mail"}/>
                            <input className={styles.input__item} type="text" placeholder={"Message"}/>
                            <div className={styles.btn__privacy_wrap}>
                                <button className={styles.submit} type={"submit"}>
                                    <div className={styles.submit__text}>
                                        Submit
                                    </div>
                                    <div className={styles.submit__icon}>

                                    </div>
                                </button>
                                <div className={styles.privacy}>
                                    <input type="checkbox" className={styles.checkbox} required={true}/>
                                    <div className={styles.text}>I have read the <span className={styles.link}>privacy policy</span></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.copyright__wrap}>
                    <div className={styles.menu}>
                        <div className={styles.item}>
                            FAQ
                        </div>
                        <div className={styles.item}>
                            Documents
                        </div>
                        <div className={styles.item}>
                            privacy policy
                        </div>
                    </div>
                    <div className={styles.copyright}>
                        © 2022 Funds and Management
                    </div>
                </div>
            </div>
        </footer>
    )
}