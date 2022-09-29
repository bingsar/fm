import Image from "next/image";
import minus from '../../public/minus.svg'
import plus from '../../public/plus__thin.svg'
import tailored from '../../public/tailored.jpg'
import useMediaQuery from '@mui/material/useMediaQuery'

import styles from '../../styles/mission.module.css'
import {useState} from "react";

export default function Mission() {
    const matches = useMediaQuery('(min-width:768px)');

    const [isOpenT, setIsOpenT] = useState(true)
    const [isOpenP, setIsOpenP] = useState(false)
    const [isOpenTr, setIsOpenTr] = useState(false)

    function openTHandler() {
        setIsOpenT(!isOpenT)
        setIsOpenP(false)
        setIsOpenTr(false)
    }
    function openPHandler() {
        setIsOpenT(false)
        setIsOpenP(!isOpenP)
        setIsOpenTr(false)
    }
    function openTrHandler() {
        setIsOpenT(false)
        setIsOpenP(false)
        setIsOpenTr(!isOpenTr)
    }

    return (
        <section className={styles.container}>
            <div className={styles.title}>
                our mission is the constant growth
                of your wealth.
            </div>
            <div className={styles.text}>
                We provide wealth management advice
                to institutions and individuals around
                the world. Our professionals apply intimate knowledge across regions, sectors, and asset classes to curate bespoke solutions and strategies for each client. Every step of the way, we help you make informed decisions
                to manage and grow your assets and wealth.
            </div>
            <div className={styles.items__wrap}>
                {!matches ?
                    <div className={styles.items}>
                        <div className={styles.item}>
                            <div className={styles.item__title} onClick={() => openTHandler()}>
                                <div className={styles.title__text}>
                                    Tailored.
                                </div>
                                <div className={styles.title__icon}>
                                    {isOpenT ? <div className={styles.minus}><Image src={minus} /></div> : <div className={styles.plus}><Image src={plus} /></div>}
                                </div>
                            </div>
                            {isOpenT ? <div className={styles.item__text}>We understand that your values, needs, and goals are unique and create strategies with accurate attention to your aspirations.</div> : null}
                        </div>
                        {isOpenT ? <div className={styles.item__image}><Image src={tailored}></Image></div> : null }
                        <div className={styles.item}>
                            <div className={styles.item__title} onClick={() => openPHandler()}>
                                <div className={styles.title__text}>
                                    Progressive
                                </div>
                                <div className={styles.title__icon}>
                                    {isOpenP ? <div className={styles.minus}><Image src={minus} /></div> : <div className={styles.plus}><Image src={plus} /></div>}
                                </div>
                            </div>
                            {isOpenP ? <div className={styles.item__text}>We understand that your values, needs, and goals are unique and create strategies with accurate attention to your aspirations.</div> : null }
                        </div>
                        {isOpenP ? <div className={styles.item__image}><Image src={tailored}></Image></div> : null }
                        <div className={styles.item}>
                            <div className={styles.item__title} onClick={() => openTrHandler()}>
                                <div className={styles.title__text}>
                                    Transparent.
                                </div>
                                <div className={styles.title__icon}>
                                    {isOpenTr ? <div className={styles.minus}><Image src={minus} /></div> : <div className={styles.plus}><Image src={plus} /></div>}
                                </div>
                            </div>
                            {isOpenTr ? <div className={styles.item__text}>We understand that your values, needs, and goals are unique and create strategies with accurate attention to your aspirations.</div> : null }
                        </div>
                    </div>
                    :
                    <div className={styles.items}>
                        <div className={styles.items__desktop}>
                            <div className={styles.item}>
                                <div className={styles.item__title} onClick={() => openTHandler()}>
                                    <div className={styles.title__text}>
                                        Tailored.
                                    </div>
                                    <div className={styles.title__icon}>
                                        {isOpenT ? <div className={styles.minus}><Image src={minus} /></div> : <div className={styles.plus}><Image src={plus} /></div>}
                                    </div>
                                </div>
                                {isOpenT ? <div className={styles.item__text}>We understand that your values, needs, and goals are unique and create strategies with accurate attention to your aspirations.</div> : null}
                            </div>
                            <div className={styles.item}>
                                <div className={styles.item__title} onClick={() => openPHandler()}>
                                    <div className={styles.title__text}>
                                        Progressive
                                    </div>
                                    <div className={styles.title__icon}>
                                        {isOpenP ? <div className={styles.minus}><Image src={minus} /></div> : <div className={styles.plus}><Image src={plus} /></div>}
                                    </div>
                                </div>
                                {isOpenP ? <div className={styles.item__text}>We understand that your values, needs, and goals are unique and create strategies with accurate attention to your aspirations.</div> : null }
                            </div>
                            <div className={styles.item}>
                                <div className={styles.item__title} onClick={() => openTrHandler()}>
                                    <div className={styles.title__text}>
                                        Transparent.
                                    </div>
                                    <div className={styles.title__icon}>
                                        {isOpenTr ? <div className={styles.minus}><Image src={minus} /></div> : <div className={styles.plus}><Image src={plus} /></div>}
                                    </div>
                                </div>
                                {isOpenTr ? <div className={styles.item__text}>We understand that your values, needs, and goals are unique and create strategies with accurate attention to your aspirations.</div> : null }
                            </div>
                        </div>
                        <div className={styles.images}>
                            {isOpenT ? <div className={styles.item__image}><Image src={tailored}></Image></div> : null }
                            {isOpenP ? <div className={styles.item__image}><Image src={tailored}></Image></div> : null }
                            {isOpenTr ? <div className={styles.item__image}><Image src={tailored}></Image></div> : null }
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}