import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination, Thumbs} from 'swiper';
import ReactHtmlParser from 'react-html-parser';
import useMediaQuery from "@mui/material/useMediaQuery";

import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from '/styles/nearBy.module.css'
import Image from "next/image";

export default function NearBy({ product }) {

    const matches = useMediaQuery('(min-width: 768px)')
    let slidesPerView
    !matches ? slidesPerView = 1 : slidesPerView = 2
    let nearByArray
    let htmlImage
    let htmlText
    let alt
    let path
    let slide

    if (product.shortDescription) {
        nearByArray = product.shortDescription.split(' ')
        return (
            <div className={styles.near}>
                <div className={styles.title}>
                    Near the object.
                </div>
                <div className={styles.slider}>
                    <Swiper
                        slidesPerView={slidesPerView}
                        modules={[Pagination, Navigation]}
                        spaceBetween={20}
                        pagination={{
                            clickable: true,
                            renderBullet: function (index, className) {
                                return '<div class="' + className + '">' + "<div class='pagination__number'>" + (index + 1) + '</div>' + '</div>';
                            }
                        }}
                        navigation={true}
                        className="nearby__swiper"
                    >
                        { nearByArray.map((item, index) => {
                            path = item.includes('src')

                            if (path) {
                                path = item.replace('src="', '').replace('"', '')
                                return <SwiperSlide key={index}>
                                    <div className={styles.slide__image}>
                                        <Image src={path} layout={"fill"}/>
                                    </div>
                                </SwiperSlide>
                            }

                        })}

                    </Swiper>
                </div>
            </div>
        )
    } else {
        null
    }
}