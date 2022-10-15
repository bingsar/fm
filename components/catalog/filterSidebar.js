import Image from "next/image";
import arrow__white from '/public/arrow__white.svg'
import arrow__black from '/public/arrow__black.svg'

import styles from '/styles/filterSidebar.module.css'


export default function FilterSidebar({ data }) {

    

    const countryCategory = 31
    const { productCategories } = data
    console.log(productCategories)

    function handleCountryCheck() {

    }


    return (
        <div className={styles.sidebar}>
            <div className={styles.country__filter}>
                <div className={styles.country__drop_bar}>
                    <div className={styles.country__title}>
                        country
                    </div>
                    <div className={styles.country__clear}>
                        Clear
                    </div>
                    <div className={styles.country__icon}>
                        <Image src={arrow__black} />
                    </div>
                </div>
                <div className={styles.country__list}>
                    { productCategories.edges.map((category, index) => {
                        if (category.node.parentDatabaseId === countryCategory) {
                            console.log(category)
                            return <div className={styles.country__item} key={index}>
                                <div className={styles.country__name}>
                                    { category.node.name }
                                </div>
                                <div className={styles.country__input}>
                                    <input type="checkbox" onChange={() => handleCountryCheck()}/>
                                </div>
                            </div>
                        }
                    })}
                </div>
            </div>
        </div>
    )
}