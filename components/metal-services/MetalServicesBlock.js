import Link from "next/link";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import refining from '/public/refining.jpg'
import assaying from '/public/assaying.jpg'
import brokerage from '/public/brokerage.jpg'

import styles from "/styles/metalServicesBlock.module.css"


export default function MetalServicesBlock() {

    

    const matches = useMediaQuery('(min-width:768px)');

    return (
        <section className="container">
            { matches ? null :
                <div className={styles.breadcrumbs}>
                    <Link href="/"><a className="link">Home</a></Link>/ Precious Metal Services.
                </div>
            }
            <div className={styles.title}>
                Precious metal services.
            </div>
            <div className={styles.subtitle}>
                We provide the most advanced and exclusive services helping private individuals turn their precious metals into high value.
            </div>
            <div className={styles.items}>
                <div className={styles.item}>
                    <div className={styles.image}>
                        <Image src={refining} />
                    </div>
                    <div className={styles.item__title}>
                        Refinig services.
                    </div>
                    <div className={styles.item__text}>
                        We provide high quality Gold, Silver and Platinum refining services.Using our professional evaluation methods and
                        the best refining technologies
                        we produce investment grade bullion with the highest possible purity.
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.image}>
                        <Image src={assaying} />
                    </div>
                    <div className={styles.item__title}>
                        Assaying services.
                    </div>
                    <div className={styles.item__text}>
                        Whether you are buying, selling,
                        or refining your precious metals, you need to be sure of their purity and composition. We provide assaying service to certify the quality of your precious metals.
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.image}>
                        <Image src={brokerage} />
                    </div>
                    <div className={styles.item__title}>
                        Precious metal brokerage.
                    </div>
                    <div className={styles.item__text}>
                        We provides private clients with a full-service precious metals trading capability and global access to the related financial markets.
                    </div>
                </div>
            </div>
        </section>
    )
}