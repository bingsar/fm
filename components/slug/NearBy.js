import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination, Thumbs} from 'swiper';

import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from '/styles/nearBy.module.css'
import Image from "next/image";

export default function NearBy({ product }) {

    const nearByArray = product.shortDescription.split(' ')

    return (
        <div className={styles.near}>
            <div className={styles.title}>
                Near the object.
            </div>
            <div className={styles.slider}>
                <Swiper
                    modules={[Pagination, Navigation]}
                    pagination={{
                        clickable: true,
                        renderBullet: function(index, className) {
                            return '<div class="' + className + '">' + "<div class='pagination__number'>" + (index+1) + '</div>' + '</div>';
                        }
                    }}
                    navigation={true}
                    className="nearby__swiper"
                >
                    { nearByArray.map((item, index) => {
                        let path = item.includes('src')
                        let alt = item.includes('alt')
                        if (path) {
                            path = item.replace('src="', '').replace('"', '')
                        let slideWithImage
                            // return <SwiperSlide key={index}>
                            //       <div className={styles.slide__image}>
                            //              <Image src={path} layout={"fill"}/>
                            //          </div>
                            //          <div className={styles.slide__text}>
                            //              {alt}
                            //          </div>
                            //      </SwiperSlide>

                        } else if (alt) {
                            alt = item.replace('alt="', '').replace('"', '')
                            console.log(alt)
                        }
                    })}
                </Swiper>
            </div>
        </div>
    )
}