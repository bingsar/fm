import Image from "next/image";
import plus from "../public/plus.svg"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "../styles/addPropertyBar.module.css"

export default function AddPropertyBar() {
    const [isClose, setIsClose] = useState(false)

    function handleClose() {
        setIsClose(true)
    }


    return (
        <AnimatePresence>
            {!isClose && (
                <motion.div exit={{ height: 0, opacity: 0 }} className="container">
                    <div className={styles.bar}>
                        <div className={styles.plus__btn}>
                            <div className={styles.plus__icon}>
                                <Image src={plus} />
                            </div>
                            <div className={styles.text}>
                                Submit to add your properties into the F&M real estate catalog.
                            </div>
                        </div>
                        <div className={styles.close__btn} onClick={() => handleClose()}>
                            Close
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}