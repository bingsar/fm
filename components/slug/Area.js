import React, { useState } from "react";
import Image from "next/image";
import minus from "../../public/minus.svg";
import plus from "../../public/plus__thin.svg";

import styles from '/styles/specifications.module.css'

export default function Area({ product }) {
    const [isAreaOpen, setAreaOpen] = useState(false)
    const areaCategory = 76
    function handleAreaClick() {
        setAreaOpen(!isAreaOpen)
    }

    return (
        <div className={styles.item}>
            <div className={styles.desc__item_title_wrap} onClick={() => { handleAreaClick() }}>
                <div className={styles.desc__item_title}>
                    The area around
                </div>
                { isAreaOpen ?
                    <div className={styles.desc__item_title_icon_minus}>
                        <Image src={minus} />
                    </div>
                    :
                    <div className={styles.desc__item_title_icon_plus}>
                        <Image src={plus} />
                    </div>
                }
            </div>
            { isAreaOpen ?
                <div className={styles.items}>
                    { product.productCategories.edges.map((category, index) => { if (category.node.parentDatabaseId === areaCategory) {
                        return <div className={styles.item__mainRooms} key={index}>
                            <div className={styles.item__value_checked}>
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="13" height="13" fill="black"/>
                                </svg>
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
