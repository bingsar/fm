import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';
import star from '/public/star.svg'
import propertyType from '/public/propertyType.svg'
import address from '/public/address.svg'
import manager from '/public/michael.jpg'
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MainRooms from "../../components/slug/MainRooms";
import AdditionalItem from "../../components/slug/AdditionalItem";
import Area from "../../components/slug/Area";
import Infrastructure from "../../components/slug/Infrastructure";
import Location from "../../components/slug/Location";
import NearBy from "../../components/slug/NearBy";
import Info from "../../components/slug/Info";
import AnyQuestions from "../../components/slug/AnyQuestions";
import Similar from "../../components/slug/Similar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { Thumbs } from 'swiper';
import { client } from "../../lib/apollo";
import {gql, useQuery} from "@apollo/client";

import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/thumbs'
import styles from '/styles/slug.module.css'


export default function Slug({ product, data }) {

    const [isLoadMore, setLoadMore] = useState(false)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const matches = useMediaQuery("(min-width: 768px)")
    const countryCategory = 31
    const propertyTypeCategory = 35
    const { id, name, image, galleryImages, productCategories, attributes, slug, purchaseNote, description, productTags } = product;

    let extractedPrice

    function openMoreHandler() {
        setLoadMore(!isLoadMore)
    }

    return (
        <div className="container__wrap">
            <Head>
                <title>F&M | { name }</title>
                <link rel="icon" href="/logo_fm.svg"></link>
            </Head>
            <Header />
            <main>
                <section className="container">
                    <div className={styles.breadcrumbs}>
                        <Link href="/"><a className="link">Home</a></Link>/<Link href="/catalog"><a className="link">Estate Catalog</a></Link>/ { name }
                    </div>
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
                                    navigation
                                    pagination={{
                                        clickable: true,
                                        renderBullet: function(index, className) {
                                            return '<div class="' + className + '">' + "<div class='pagination__number'>" + (index+1) + '</div>' + '</div>';
                                        }
                                    }}
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
                                    { attributes.edges.map((price) => {
                                        if (price.node.name === 'Price') {
                                            extractedPrice = price.node.options[0]
                                            return price.node.options[0]
                                        }
                                    }) }
                                </div>
                                <div className={styles.currency}>
                                    USD
                                </div>
                            </div>
                            <div className={styles.square}>
                                <div className={styles.square__title}>
                                    Square
                                </div>
                                <div className={styles.square__value}>
                                    { attributes.edges.map((sqm) => {
                                        if (sqm.node.name === 'sqm') {
                                            return sqm.node.options[0]
                                        }
                                    }) } Sqm
                                </div>
                            </div>
                            <div className={styles.sqmPerM}>
                                <div className={styles.sqmPerM__title}>
                                    Price per square meter
                                </div>
                                <div className={styles.sqmPerM__value}>
                                    { attributes.edges.map((sqm) => { if (sqm.node.name === 'sqm') { return (extractedPrice / sqm.node.options[0]).toFixed(2)  } }) } USD
                                </div>
                            </div>
                            <div className={styles.floor}>
                                <div className={styles.floor__title}>
                                    Floor / levels
                                </div>
                                <div className={styles.floor__value}>
                                    { attributes.edges.map((floor) => { if (floor.node.name === 'Floor / levels') { return floor.node.options[0]  } }) }
                                </div>
                            </div>
                            { productTags.edges.map((tag, index) => {
                                return <div className={styles.tags} key={index}>
                                    <div className={styles.tags__icon}>
                                        <Image src={star} />
                                    </div>
                                    <div className={styles.tags__value}>
                                        { tag.node.name.replace(/-/g, ' ') }
                                    </div>
                                </div>
                            } ) }
                            { matches ? <div className={styles.manager}>
                                <div className={styles.manager__img}>
                                    <Image src={manager} />
                                </div>
                                <div className={styles.manager__info}>
                                    <div className={styles.manager__title}>
                                        Object manager
                                    </div>
                                    <div className={styles.manager__name}>
                                        Michael Lee
                                    </div>
                                    <div className={styles.manager__btn}>
                                        <div className={styles.manager__btn_text}>
                                            call me
                                        </div>
                                        <div className={styles.manager__icon}>

                                        </div>
                                    </div>
                                </div>
                            </div>
                                :
                            null
                            }
                        </div>
                    </div>
                    <div className={styles.leftColumn}>
                        <div className={styles.desc}>
                            <div className={styles.desc__title}>
                                Description.
                            </div>
                            <div className={styles.desc__text}>
                                { isLoadMore ? description : description.slice(0, 300) + '...' }
                                { !isLoadMore ? <div className={styles.desc__more} onClick={() => openMoreHandler()}>
                                    more
                                </div>
                                    :
                                    null }
                            </div>
                        </div>
                        <div className={styles.spec}>
                            <div className={styles.spec__title}>
                                Specifications.
                            </div>
                            <div className={styles.desc__items}>
                                <MainRooms product={product} />
                                <AdditionalItem product={product} data={data}/>
                                <Area product={product}  data={data}/>
                            </div>
                        </div>
                        <div className={styles.infrastruct}>
                            <div className={styles.spec__title}>
                                Infrastructure.
                            </div>
                        </div>
                        <Infrastructure product={product} data={data}/>
                        <Location />
                        <NearBy product={product} />
                        <Info product={product} />
                    </div>
                </section>
                <AnyQuestions />
                <section className="container">
                    <Similar product={product}/>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export async function getStaticProps({ params }) {

    const GET_PRODUCT_BY_URI = gql`
        query getProductBySlug( $id: ID!) {
            simpleProduct(id: $id, idType: SLUG) {
                attributes {
                  edges {
                    node {
                      options
                      name
                    }
                  }
                }
                price
                productTags {
                  edges {
                    node {
                      name
                    }
                  }
                }
                downloads {
                  file
                  name
                }
                crossSell {
                  edges {
                    node {
                      name
                      slug
                      productCategories(first: 100) {
                        edges {
                          node {
                            name
                            parentDatabaseId
                            databaseId
                          }
                        }
                      }
                      attributes {
                        edges {
                          node {
                            name
                            options
                          }
                        }
                      }
                      image {
                        mediaItemUrl
                        sizes
                      }
                    }
                  }
                }
                attributes {
                  edges {
                    node {
                      id
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
                productCategories(first: 100) {
                  edges {
                    node {
                      parentDatabaseId
                      name
                      databaseId
                    }
                  }
                }
                description(format: RAW)
                shortDescription(format: RAW)
              }
            }
  
    `


    const response = await client.query({
        query: GET_PRODUCT_BY_URI,
        variables: {
            id:params.slug
        }
    })
    const product = response?.data?.simpleProduct

    const GET_DATA = gql`
        query getData {
          productCategories(first: 100) {
            edges {
              node {
                parentDatabaseId
                name
                databaseId
              }
            }
          }
        }
    `

    const res = await client.query({
        query: GET_DATA
    })
    const data = res?.data


    return {
        props: {
            product,
            data
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