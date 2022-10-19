import Image from "next/image";
import plus from "../public/plus.svg"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "../styles/addPropertyBar.module.css"
import useAppContext from "../src/store";

export default function AddPropertyBar() {

    const [isHovered, setHovered] = useState(false)

    const matches = useMediaQuery('(min-width: 768px)')

    const { showAnimation, setShowAnimation, setIsClose, isClose } =  useAppContext()

    const container = {
        start: { opacity: 0 },
        finish: {
            opacity: 1,
            transition: {
                delay: 1.9,
                duration: 1
            }
        },
    }

    function handleClose() {
        setIsClose(true)
    }
    function onComplete() {
        setShowAnimation(false)
    }


    if (matches) {
        return (
            <AnimatePresence>
                {!isClose && (
                    <motion.div
                        variants={ container }
                        initial={ showAnimation ? "start" : "finish" }
                        animate="finish"
                        onAnimationComplete={ onComplete }
                        exit={{ height: 0, opacity: 0 }}
                        className="container"
                    >
                        <div className={styles.bar}>
                            <div className={styles.plus__btn}>
                                <div className={styles.plus__icon}>
                                    <div className={styles.icon}>
                                        <span className={styles.h}></span>
                                        <span className={styles.v}></span>
                                    </div>
                                </div>
                                <div className={styles.text}>
                                    Submit to add your properties into the Minkh Capital real estate catalog.
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
    } else {
        return (
            <AnimatePresence>
                {!isClose && (
                    <div className="container">
                        <div className={styles.bar}>
                            <div className={styles.plus__btn}>
                                <div className={styles.plus__icon}>
                                    <Image src={plus} />
                                </div>
                                <div className={styles.text}>
                                    Submit to add your properties into the Minkh Capital real estate catalog.
                                </div>
                            </div>
                            <div className={styles.close__btn} onClick={() => handleClose()}>
                                Close
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        )
    }

}