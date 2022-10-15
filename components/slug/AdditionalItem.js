import Image from "next/image";
import minus from "../../public/minus.svg";
import plus from "../../public/plus__thin.svg";
import { useEffect, useState } from "react";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from '/styles/specifications.module.css'



export default function AdditionalItem({ product, data }) {

    

    const matches = useMediaQuery('(min-width: 768px)')

    const { productCategories } = product
    const [isAdditionalsOpen, setAdditionalsOpen] = useState(false)
    const additionalsCategory = 92

    useEffect(() => {
        if (matches) {
            setAdditionalsOpen(true)
        }
    })

    function handleAdditionalsClick() {
        setAdditionalsOpen(!isAdditionalsOpen)
    }

    return (
        <div className={styles.item}>
            <div className={styles.desc__item_title_wrap} onClick={() => { !matches ? handleAdditionalsClick() : null }}>
                <div className={styles.desc__item_title}>
                    Additionals
                </div>
                { !matches ? isAdditionalsOpen ?
                    <div className={styles.desc__item_title_icon_minus}>
                        <Image src={minus} />
                    </div>
                    :
                    <div className={styles.desc__item_title_icon_plus}>
                        <Image src={plus} />
                    </div>
                    :
                    null
                }
            </div>
            { isAdditionalsOpen ?
                <div className={styles.items}>
                    { data.productCategories.edges.map((category, index) => { if (category.node.parentDatabaseId === additionalsCategory) {
                                return <div className={styles.item__mainRooms} key={index}>
                                    <div className={styles.item__value_checked}>
                                        { productCategories.edges.map((item, index) => { if (item.node.databaseId === category.node.databaseId) {
                                            return <svg key={index} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="13" height="13" fill="black"/>
                                            </svg>
                                        }})}
                                    </div>
                                    <div className={styles.item__name}>
                                        {category.node.name}
                                    </div>
                                </div>

                    }})}
                </div>
                :
                null
            }
        </div>
    )
}