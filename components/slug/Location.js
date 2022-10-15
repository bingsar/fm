import Image from "next/image";
import map from '/public/map.jpg'

import styles from '/styles/location.module.css'


export default function Location() {

    

    return (
        <div className={styles.location}>
            <div className={styles.title}>
                location.
            </div>
            <div className={styles.text}>
                We provide wealth management advice to institutions and individuals around the world. Our professionals apply intimate knowledge across regions, sectors, and asset classes to curate bespoke solutions and strategies for each client. Every step of the way, we help you make informed decisions to manage and grow your assets and wealth.
            </div>
            <div className={styles.map}>
                <Image src={map} layout={"responsive"} />
            </div>
        </div>
    )
}