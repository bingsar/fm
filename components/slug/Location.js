import Image from "next/image";
import map from '/public/map.jpg'

import styles from '/styles/location.module.css'


export default function Location({ location }) {

    return (
        <div className={styles.location}>
            <div className={styles.title}>
                location.
            </div>
            <div className={styles.text}>
                We provide wealth management advice to institutions and individuals around the world. Our professionals apply intimate knowledge across regions, sectors, and asset classes to curate bespoke solutions and strategies for each client. Every step of the way, we help you make informed decisions to manage and grow your assets and wealth.
            </div>
            <div className={styles.map}>
                <iframe
                    width="100%"
                    height="500"
                    frameBorder="0" style={{border:0}}
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB3Ek6gW6gCNmzvbx1OablUHnFmNuwxHdk&q=${location}`}
                    allowFullScreen>
                </iframe>
            </div>
        </div>
    )
}