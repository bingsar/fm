import styles from '/styles/location.module.css'


export default function Location({ location, description }) {
    console.log(description)
    console.log(location)
    return (
        <div className={styles.location}>
            <div className={styles.title}>
                location.
            </div>
            <div className={styles.text}>
                { description }
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