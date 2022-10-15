import styles from "../../styles/slug.module.css";
import {useEffect, useRef, useState} from "react";

export default function CurrentSlugPrice({price, currency, changedValue, changedCurrency}) {

    const thisPrice = useRef()
    const [value, setValue] = useState()
    const [isCurrency, setIsCurrency] = useState(currency)
    const [rate, setRate] = useState()

    useEffect(() => {
        setValue(thisPrice.current.innerHTML)
        changedValue(value)
        changedCurrency(isCurrency)
    })

    function handleCurrency(e) {
        setIsCurrency(e.target.value)
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
            <div className={styles.price__wrap}>
                <div className={styles.price} ref={thisPrice}>
                    {isCurrency === 'AED' ? price * rate?.rates['AED'] : isCurrency === 'TRY' ? price * rate?.rates['TRY'] : price }
                </div>
                <select className={styles.currency} value={isCurrency} onChange={handleCurrency}>
                    <option value="USD">USD</option>
                    <option value="TRY">TRY</option>
                    <option value="AED">AED</option>
                </select>
            </div>
        </>
    )

}