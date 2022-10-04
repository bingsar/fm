import Image from "next/image";
import minus from "../../public/minus.svg";
import plus from "../../public/plus__thin.svg";
import React, {useState} from "react";

import styles from "../../styles/specifications.module.css";

export default function Infrastructure({ product }) {

    const [isInfrastructureOpen, setInfrastructureOpen] = useState(false)
    const infrastructureCategory = 81

    function handleInfrastructureClick() {
        setInfrastructureOpen(!isInfrastructureOpen)
    }

    console.log(product)

    return (
        <div className={styles.infrastructure}>
            { product.productCategories.edges.map((category, index) => { if (category.node.parentDatabaseId === infrastructureCategory) {
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
    )
}