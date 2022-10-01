import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from "next/image";
import slide1 from '../../public/slide1.png'
import slide2 from '../../public/slide2.png'
import slide3 from '../../public/slide3.png'
import slide4 from '../../public/slide4.png'

import styles from '../../styles/catalogSlider.module.css'
import 'swiper/css';
import "swiper/css/pagination";

export default function CatalogSlider() {

    const matches = useMediaQuery('(min-width:768px)');

    return (
        <section className={styles.container}>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                loop={false}
                slidesPerView={"auto"}
                pagination={{
                    clickable: true,
                    renderBullet: function(index, className) {
                        return '<div class="' + className + '">' + "<div class='pagination__number'>" + (index + 1) + '</div>' + '</div>';
                    }
                }}
                id="catalog__swiper"
            >
                <SwiperSlide>
                    <div className={styles.slide__image}>
                        <Image src={slide1} layout={"fixed"} width={matches ? 340 : 203} height={matches ? 230 : 143}/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.slide__image}>
                        <Image src={slide2} layout={"fixed"} width={matches ? 340 : 203} height={matches ? 230 : 143}/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.slide__image}>
                        <Image src={slide3} layout={"fixed"} width={matches ? 340 : 203} height={matches ? 230 : 143}/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.slide__image}>
                        <Image src={slide4} layout={"fixed"} width={matches ? 340 : 203} height={matches ? 230 : 143}/>
                    </div>
                </SwiperSlide>
            </Swiper>
            {!matches ? <div className={styles.catalog__btn}>See all catalog</div> : null}
        </section>
    )
}