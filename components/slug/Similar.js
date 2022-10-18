import {Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import SimilarPrice from "./SimilarPrice";

import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from '/styles/similar.module.css'
import globus from "../../public/globus.svg";
import sqm from "../../public/sqm.svg";
import bedroom from "../../public/bedroom.svg";
import bathroom from "../../public/bathroom.svg";
import {useState} from "react";


export default function Similar({ product }) {

    const [currency, setCurrency] = useState()

    const matches = useMediaQuery('(min-width: 768px)')
    const matches490 = useMediaQuery('(min-width:490px)')
    const matches1000 = useMediaQuery('(min-width: 1000px)')
    const matches1200 = useMediaQuery('(min-width: 1200px)')

    let slidePerView

    matches1200 ? slidePerView = 4 : matches ? slidePerView = 3 : slidePerView = 2

    const { crossSell } = product
    const propertyTypeCategory = 35
    const countryCategory = 31

    return (
        <div className={styles.similar}>
            <div className={styles.title}>
                similar offers.
            </div>
            <div className={styles.slider}>
                <Swiper
                    slidesPerView={slidePerView}
                    spaceBetween={15}
                    modules={[Pagination, Navigation]}
                    pagination={{
                        clickable: true,
                        renderBullet: function(index, className) {
                            return '<div class="' + className + '">' + "<div class='pagination__number'>" + (index+1) + '</div>' + '</div>';
                        }
                    }}
                    navigation={true}
                    className="similar__swiper"
                >
                    { crossSell.edges.map((similar, index) => {

                        const handleCurrency = (e) => {
                            setCurrency(e)
                        }

                        return <SwiperSlide className={styles.slide} key={index}>
                                <div>
                                    <Link href={{ pathname: `/catalog/${similar.node.slug}`, query: { currency: currency } }}>
                                        <div>
                                            <div className={styles.slide__image}>
                                                <Image src={similar.node.image.mediaItemUrl} layout={"fill"}/>
                                            </div>
                                            <div className={styles.similar__title}>
                                                { similar.node.name }
                                            </div>
                                            <div>
                                                { similar.node.productCategories.edges.map((type) => { if (type.node.parentDatabaseId === propertyTypeCategory) {
                                                    return <div className={styles.similar__type}>
                                                        { type.node.name }
                                                    </div>
                                                }}) }
                                            </div>
                                            <div>
                                                { similar.node.productCategories.edges.map((country) => { if (country.node.parentDatabaseId === countryCategory) {
                                                    return <div className={styles.item__country}>
                                                        <div className={styles.country__icon}>
                                                            <Image src={globus} />
                                                        </div>
                                                        <div className={styles.country}>
                                                            { country.node.name }
                                                        </div>
                                                    </div>
                                                }}) }
                                            </div>
                                            {matches490 ?
                                                <div className={styles.item__attributes}>
                                                    <div className={`${styles.sqm} ${styles.item__attribute}`}>
                                                        <div className={styles.sqm__icon}>
                                                            <Image src={sqm}/>
                                                        </div>
                                                        <div className={styles.sqm__value}>
                                                            {similar.node.attributes.edges.map((sqm) => {
                                                                if (sqm.node.name === 'sqm') {
                                                                    return sqm.node.options[0]
                                                                }
                                                            })} sqm
                                                        </div>
                                                    </div>
                                                    <div className={`${styles.bedrooms} ${styles.item__attribute}`}>
                                                        <div className={styles.bedrooms__value}>
                                                            {similar.node.attributes.edges.map((bedroom) => {
                                                                if (bedroom.node.name === 'Bedrooms') {
                                                                    return bedroom.node.options[0]
                                                                }
                                                            })}
                                                        </div>
                                                        <div className={styles.bedrooms__icon}>
                                                            {matches1000 ? 'Bedrooms' : <Image src={bedroom}/>}
                                                        </div>
                                                    </div>
                                                    <div className={`${styles.bathrooms} ${styles.item__attribute}`}>
                                                        <div className={styles.bathrooms__value}>
                                                            {similar.node.attributes.edges.map((bathroom) => {
                                                                if (bathroom.node.name === 'Bathrooms') {
                                                                    return bathroom.node.options[0]
                                                                }
                                                            })}
                                                        </div>
                                                        <div className={styles.bathrooms__icon}>
                                                            {matches1000 ? 'Bathrooms' : <Image src={bathroom}/>}
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    </Link>
                                    { similar.node.attributes.edges.map((price) => { if (price.node.name === "Price") { return  <SimilarPrice price={[price.node.options[0]]}  currency={handleCurrency} /> }}) }
                                    <div className={styles.callBtn}>
                                        <div className={styles.callBtn__text}>
                                            Call me
                                        </div>
                                        <div className={styles.callBtn__icon}>

                                        </div>
                                    </div>
                                </div>
                        </SwiperSlide>
                    }) }
                </Swiper>
            </div>
        </div>
    )
}


export async function getStaticPaths() {
    const paths = []
    return {
        paths,
        fallback: 'blocking'
    }
}