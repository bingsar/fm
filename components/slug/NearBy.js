import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination, Thumbs} from 'swiper';
import useMediaQuery from "@mui/material/useMediaQuery";
import NearBySlide from "./nearBySlide";

import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from '/styles/nearBy.module.css'



export default function NearBy({ product }) {

    const matches = useMediaQuery('(min-width: 768px)')
    let htmlImage
    let htmlText
    let alt
    let path
    let htmlValue

    if (product?.shortDescription) {
        return (
            <div className={styles.near}>
                <div className={styles.title}>
                    Near the object.
                </div>
                <div className={styles.slider}>
                    <Swiper
                        modules={[Pagination, Navigation]}
                        slidesPerView={"auto"}
                        spaceBetween={8}
                        autoHeight={true}
                        pagination={{
                            clickable: true,
                            renderBullet: function (index, className) {
                                return '<div class="' + className + '">' + "<div class='pagination__number'>" + (index + 1) + '</div>' + '</div>';
                            }
                        }}
                        navigation={true}
                        className="nearby__swiper"
                    >
                        { product?.shortDescription.split(' ').map((item) => {

                            path = item.includes('src')
                            alt = item.includes('alt')

                            if (path) {
                            htmlImage = item.replace('src="', '').replace('"', '')

                            htmlValue = `
                                <div class="near__slide_image">
                                    <img src=${ htmlImage } layout="fill"/>
                                </div>
                                `
                            }
                            if (alt) {
                                htmlText = item.replace('alt="', '').replace('"', '')
                                htmlValue = htmlValue + `<div class="near__alt">${htmlText}</div>`
                                return <SwiperSlide><NearBySlide innerHtml={htmlValue} /></SwiperSlide>
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