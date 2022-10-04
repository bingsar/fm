import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';
import propertyType from '/public/propertyType.svg'
import address from '/public/address.svg'
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MainRooms from "../../components/slug/MainRooms";
import AdditionalItem from "../../components/slug/AdditionalItem";
import Area from "../../components/slug/Area";
import Infrastructure from "../../components/slug/Infrastructure";
import Location from "../../components/slug/Location";
import NearBy from "../../components/slug/NearBy";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { Thumbs } from 'swiper';
import { client } from "../../lib/apollo";
import { gql } from "@apollo/client";

import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/thumbs'
import styles from '/styles/slug.module.css'

export default function Slug({ product }) {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const matches = useMediaQuery("(min-width: 768px)")

    const countryCategory = 31
    const propertyTypeCategory = 35

    const { id, name, image, galleryImages, productCategories, attributes, slug, purchaseNote } = product;

    return (
        <div className="container__wrap">
            <Head>
                <title>F&M | { name }</title>
                <link rel="icon" href="/logo_fm.svg"></link>
            </Head>
            <Header />
            <main>
                <section className="container">
                    { matches ? null :
                        <div className={styles.breadcrumbs}>
                            <Link href="/"><a className="link">Home</a></Link>/<Link href="/catalog"><a className="link">Catalog</a></Link>/ { name }
                        </div>
                    }
                    <div className={styles.titleAndSliderAndInfo}>
                        <div className={styles.titleAndSlider}>
                            <div className={styles.header__wrap}>
                                <div className={styles.title}>
                                    { name }
                                </div>
                                <div className={styles.property__props}>
                                    <div className={styles.property__type_wrap}>
                                        <div className={styles.property__type_icon}>
                                            <Image src={propertyType} />
                                        </div>
                                        <div className={styles.property__type}>
                                            { productCategories.edges.map((category) => { if (category.node.parentDatabaseId === propertyTypeCategory) {return category.node.name}}) }
                                        </div>
                                    </div>
                                    <div className={styles.property__address_wrap}>
                                        <div className={styles.property__address_icon}>
                                            <Image src={address} />
                                        </div>
                                        <div className={styles.property__address}>
                                            { purchaseNote }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.gallery__slider}>
                                <Swiper
                                    modules={[Thumbs, Pagination, Navigation]}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    pagination={{
                                        clickable: true,
                                        renderBullet: function(index, className) {
                                            return '<div class="' + className + '">' + "<div class='pagination__number'>" + (index+1) + '</div>' + '</div>';
                                        }
                                    }}
                                    navigation={true}
                                    className="gallery__swiper"
                                >
                                    <SwiperSlide>
                                        <div className={styles.slide__image}>
                                            <Image src={image.mediaItemUrl} layout={"fill"}/>
                                        </div>
                                    </SwiperSlide>
                                    { galleryImages.edges.map((slide, index) => {
                                        return <SwiperSlide key={index}>
                                            <div className={styles.slide__image}>
                                                <Image src={slide.node.mediaItemUrl} layout={"fill"}/>
                                            </div>
                                        </SwiperSlide>
                                    }) }
                                </Swiper>
                                { matches ?
                                    <Swiper
                                        modules={[Thumbs]}
                                        watchSlidesProgress
                                        onSwiper={setThumbsSwiper}
                                        slidesPerView={3}
                                        className="gallery__thumbs"
                                    >
                                        <SwiperSlide>
                                            <div className={styles.slide__thumb_image}>
                                                <Image src={image.mediaItemUrl} layout={"fill"}/>
                                            </div>
                                        </SwiperSlide>
                                        { galleryImages.edges.map((slide, index) => {
                                            return <SwiperSlide key={index}>
                                                <div className={styles.slide__thumb_image}>
                                                    <Image src={slide.node.mediaItemUrl} layout={"fill"}/>
                                                </div>
                                            </SwiperSlide>
                                        }) }
                                    </Swiper>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <div className={styles.property__info}>
                            <div className={styles.price__wrap}>
                                <div className={styles.price}>
                                    { attributes.edges.map((price) => { if (price.node.name === 'Price') {return price.node.options[0]} }) }
                                </div>
                                <div className={styles.currency}>
                                    USD
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.desc}>
                        <div className={styles.desc__title}>
                            Description.
                        </div>
                        <div className={styles.desc__text}>
                            We provide wealth management advice to institutions and individuals around the world. Our professionals apply intimate knowledge across regions, sectors, and asset classes to curate bespoke solutions and strategies for each client. Every step of the way, we help you make informed decisions to manage and grow your assets and wealth.
                        </div>
                    </div>
                    <div className={styles.spec}>
                        <div className={styles.spec__title}>
                            Specifications.
                        </div>
                        <div className={styles.desc__items}>
                            <MainRooms product={product} />
                            <AdditionalItem product={product} />
                            <Area product={product} />
                        </div>
                    </div>
                    <div className={styles.infrastruct}>
                        <div className={styles.spec__title}>
                            Infrastructure.
                        </div>
                    </div>
                    <Infrastructure product={product} />
                    <Location />
                    <NearBy product={product} />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export async function getStaticProps({ params }) {

    const GET_PRODUCT_BY_URI = gql`
        query getProductBySlug( $id: ID!) {
          product( id: $id, idType: SLUG ) {
            attributes {
              edges {
                node {
                  options
                  name
                }
              }
            }
            slug
            name
            description(format: RAW)
            purchaseNote
            image {
              mediaItemUrl
            }
            galleryImages {
              edges {
                node {
                  mediaItemUrl
                }
              }
            }
            productCategories(first:100) {
              edges {
                node {
                  parentDatabaseId
                  name
                }
              }
            }
            description(format: RAW)
            shortDescription(format: RAW)
          }
          tags {
            edges {
              node {
                name
              }
            }
          }
          productCategories {
            edges {
              node {
                children {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
    `
    const response = await client.query({
        query: GET_PRODUCT_BY_URI,
        variables: {
            id:params.slug
        }
    })
    const product = response?.data?.product
    return {
        props: {
            product
        }
    }
}

export async function getStaticPaths() {
    const paths = []
    return {
        paths,
        fallback: 'blocking'
    }
}