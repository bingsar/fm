import Link from "next/link";
import Image from "next/image";
import filter from "../../public/filter.svg";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from '/styles/catalogHero.module.css'

export default function CatalogHero() {

    const matches = useMediaQuery('(min-width: 768px)')

    return (
        <>
            <div className={styles.breadcrumbs}>
                <Link href="/"><a className="link">Home</a></Link>/ Estate Catalog.
            </div>
            <div className={styles.title}>
                REAL ESTATE CATALOG.
            </div>
            <div className={styles.addCatalog__btn_wrap}>
                { !matches ?
                    <div className={styles.filter__icon}><Image src={filter}/></div>
                    :
                    null
                }
                <div className={styles.addCatalog__btn}>
                    <div className={styles.btn__text}>
                        add your real estate
                    </div>
                    { matches ?
                        <div className={styles.btn__icon}> </div>
                        :
                        null
                    }
                </div>
                { matches ?
                    <div className={styles.addCatalog__text}>
                        Add your properties into
                        the F&M real estate catalog.
                    </div>
                    :
                    null
                }
            </div>
        </>
    )
}