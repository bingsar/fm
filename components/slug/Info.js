import Image from "next/image";
import docs from '../../public/documents__icon.svg'
import pres from '../../public/presentation__icon.svg'
import Link from "next/link";

import styles from '/styles/info.module.css'


export default function Info({ product }) {

    

    if (product.downloads) {
        const { attributes, downloads } = product
        let document = downloads.map((file) => { if (file.name === 'Document') { return file.file }})
        let presentation = downloads.map((file) => { if (file.name === 'Presentation') { return file.file }})

        return (
            <div className={styles.info}>
                <div className={styles.title}>
                    Info.
                </div>
                <div className={styles.number__wrap}>
                    <div className={styles.number__title}>
                        Project number:&nbsp;
                    </div>
                    <div className={styles.value}>
                        { attributes.edges.map((number) => { if (number.node.name === 'Project number') {
                            return number.node.options[0]
                        }})}
                    </div>
                </div>
                <div className={styles.developer}>
                    <div className={styles.dev__title}>
                        Developer/ complex:&nbsp;
                    </div>
                    <div className={styles.value}>
                        { attributes.edges.map((developer) => { if (developer.node.name === 'Developer/ complex') {
                            return developer.node.options[0]
                        }})}
                    </div>
                </div>
                <div className={styles.columns}>
                    <div className={styles.column}>
                        <div className={styles.column__item}>
                            <div className={styles.column__icon}>
                                <Image src={docs} />
                            </div>
                            <div className={styles.column__text}>
                                <Link href={ document[0] }><a className={styles.link}>Documents</a></Link>
                            </div>
                        </div>
                        <div className={styles.column__item}>
                            <div className={styles.column__icon}>
                                <Image src={pres} />
                            </div>
                            <div className={styles.column__text}>
                                <Link href={ presentation[1] }><a className={styles.link}>Presentation</a></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.column__item}>
                            <div className={styles.column__text}>
                                Owner
                            </div>
                        </div>
                        <div className={styles.column__item}>
                            <div className={styles.column__text}>
                                Buyer
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        null
    }
}