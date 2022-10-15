import styles from "../../styles/similar.module.css";
import {useEffect, useState} from "react";

export default function SimilarPrice({price, currency}) {

    const [isCurrency, setIsCurrency] = useState('')
    const [rate, setRate] = useState()

    function handleCurrency(e) {
        setIsCurrency(e.target.value)
        currency(e.target.value)
    }

    useEffect(() => {
        fetch('https://api.exchangerate.host/latest?base=USD&symbols=AED,TRY&amount=1&places=0')
            .then((resp) => {
                if (resp.ok) {
                    return resp.json()
                }
                throw resp
            }).then((data) => {
            setRate(data)
        })
    }, [])

    return (
        <>
            <div className={styles.price}>
                <div className={styles.price__currency__wrap}>
                    <select className={styles.price__currency} onChange={handleCurrency}>
                        <option value="USD">USD</option>
                        <option value="TRY">TRY</option>
                        <option value="AED">AED</option>
                    </select>
                </div>
                <div className={styles.price__value}>
                    {isCurrency === 'AED' ? price * rate.rates['AED'] : isCurrency === 'TRY' ? price * rate.rates['TRY'] : price }
                </div>
            </div>
        </>
    )

}