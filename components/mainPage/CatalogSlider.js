import Link from "next/link";
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from "next/image";

import styles from '../../styles/catalogSlider.module.css'
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";

export default function CatalogSlider({ data }) {

    const [isType, setIsType] = useState([36])

    function typeHandler(id) {
        isType.includes(id) ? setIsType([id]) : setIsType([id])
    }

    const matches = useMediaQuery('(min-width:768px)');

    const propertyTypeCategory = 35

    let productCategories
    let products

    data !== undefined ? { productCategories, products } = data : null

    return (
        <section className={styles.container}>
            <svg className={styles.clipPath}>
                <clipPath id="ellipse">
                    <path d="M311.588 50.9999C340.898 107.345 297.136 188.146 213.843 231.474C130.551 274.802 39.2677 264.25 9.9575 207.905C-19.3527 151.56 24.409 70.7584 107.702 27.4304C190.995 -15.8977 282.278 -5.34529 311.588 50.9999Z"/>
                </clipPath>
            </svg>
            <div className={styles.label__title}>
                REAL ESTATE CATALOG.
            </div>
            <div className={styles.label__subtitle}>
                We handpicked for you the best-in-class private real estate properties in the market that combine high construction quality, the right location, and a high return on investment.
            </div>
            <div className={styles.labels}>
                { productCategories.edges.map((category, index) => {
                    if (category.node.parentDatabaseId === propertyTypeCategory) {
                    return  <div key={index} className={isType[0] === category.node.databaseId ? `${styles.label} ${styles.label__picked}` :styles.label } onClick={() => typeHandler(category.node.databaseId)}>
                        { category.node.name }
                    </div>
                }})}
            </div>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                loop={false}
                slidesPerView={"auto"}
                pagination={{
                    clickable: true,
                    renderBullet: function(index, className) {
                        return '<div class="' + className + '">' + "<div class='pagination__number'>" + (index+1) + '</div>' + '</div>';
                    }
                }}
                id="catalog__swiper"
            >
                { isType !== [] ? products.edges.map((item, index) => {
                    return item.node.productCategories.edges.map((category) => {
                        if (category.node.databaseId === isType[0]) {
                            return <SwiperSlide key={index}>
                                <Link href="/catalog">
                                    <div className={styles.swiper__slide}>
                                        <div className={styles.path__wrap}>
                                            <svg>
                                                <defs>
                                                    <path id="testPath" d="M239.78 39.6765C262.384 83.1297 228.635 145.443 164.4 178.858C100.165 212.272 29.7682 204.134 7.16428 160.681C-15.4396 117.228 18.3092 54.9142 82.5443 21.4998C146.779 -11.9147 217.176 -3.77667 239.78 39.6765Z"/>
                                                </defs>
                                                <text>
                                                    <textPath className={styles.pathCatalog} href="#testPath">See all catalogue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See all catalogue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See all catalogue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See all catalogue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See all catalogue</textPath>
                                                </text>
                                            </svg>
                                        </div>
                                        <div className={styles.slide__image}>
                                            <Image src={item.node.image.mediaItemUrl} layout={"fill"} />
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        }
                    })
                })
                :
                null
                }
            </Swiper>
            {!matches ? <Link href="/catalog"><div className={styles.catalog__btn}>See all catalog</div></Link> : null}
        </section>
    )
}