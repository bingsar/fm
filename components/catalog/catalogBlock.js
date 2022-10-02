import Image from "next/image";
import globus from '/public/globus.svg'
import sqm from '/public/sqm.svg'
import bedroom from '/public/bedroom.svg'
import bathroom from '/public/bathroom.svg'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination} from 'swiper';
import { useQuery, gql } from "@apollo/client";
import useMediaQuery from "@mui/material/useMediaQuery";

import 'swiper/css';
import "swiper/css/pagination";
import styles from '/styles/catalogBlock.module.css'

const GET_PRODUCTS = gql`
        query getAllProducts($first: Int!, $after: String) {
          products(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                name
                image {
                  mediaItemUrl
                }
                id
                galleryImages {
                  edges {
                    node {
                      mediaItemUrl
                    }
                  }
                }
                productCategories {
                  edges {
                    node {
                      name
                      parentDatabaseId
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
              }
            }
          }
        }
    `

const BATCH_SIZE = 8;



export default function CatalogBlock() {

    const matches = useMediaQuery('(min-width:768px)')
    const matches1440 = useMediaQuery('(min-width:1440px)')

    const { data, loading, error, fetchMore } = useQuery(GET_PRODUCTS, {
        variables: { first: BATCH_SIZE, after: null }
    });

    if (error) {
        return <p>Sorry, an error has occurred. Please reload the page.</p>;
    }

    if (!data && loading) {
        return <p className={styles.loading}>Loading...</p>;
    }

    if (!data?.products.edges.length) {
        return <p>No posts have been published.</p>;
    }

    const products = data.products.edges.map((edge) => edge.node);
    const haveMoreProducts = Boolean(data?.products?.pageInfo?.hasNextPage);

    const countryCategory = 31
    const propertyTypeCategory = 35

    return (
        <div className={styles.catalog__wrap}>
            <div className={styles.catalog__items}>
                { products.map((product, index) => {
                    const { id, name, image, galleryImages, productCategories, attributes } = product;
                    console.log(name + ' ' + id)
                    return (
                        <div className={styles.item} key={id} data-id={index}>
                            <div className={styles.item__info}>
                                <div className={styles.catalog__main_image}>
                                    <Image src={ image.mediaItemUrl } priority layout={"fill"}/>
                                </div>
                                <div className={styles.item__title}>
                                    { name }
                                </div>
                                <div className={styles.item__property_type}>
                                    { productCategories.edges.map((category) => { if (category.node.parentDatabaseId === propertyTypeCategory) {return category.node.name}}) }
                                </div>
                                <div className={styles.item__country}>
                                    <div className={styles.country__icon}>
                                        <Image src={globus} />
                                    </div>
                                    <div className={styles.country}>
                                        { productCategories.edges.map((category) => { if (category.node.parentDatabaseId === countryCategory) {return category.node.name}})}
                                    </div>
                                </div>
                                <div className={styles.item__attributes}>
                                    <div className={`${styles.sqm} ${styles.item__attribute}`}>
                                        <div className={styles.sqm__icon}>
                                            <Image src={sqm} />
                                        </div>
                                        <div className={styles.sqm__value}>
                                            { attributes.edges.map((sqm) => { if (sqm.node.name === 'sqm') {return sqm.node.options[0]} }) } sqm
                                        </div>
                                    </div>
                                    <div className={`${styles.bedrooms} ${styles.item__attribute}`}>
                                        <div className={styles.bedrooms__value}>
                                            { attributes.edges.map((bedroom) => { if (bedroom.node.name === 'Bedrooms') {return bedroom.node.options[0]} }) }
                                        </div>
                                        <div className={styles.bedrooms__icon}>
                                            { matches1440 ? 'Bedrooms' : <Image src={bedroom} />}
                                        </div>
                                    </div>
                                    <div className={`${styles.bathrooms} ${styles.item__attribute}`}>
                                        <div className={styles.bathrooms__value}>
                                            { attributes.edges.map((bathroom) => { if (bathroom.node.name === 'Bathrooms') {return bathroom.node.options[0]} }) }
                                        </div>
                                        <div className={styles.bathrooms__icon}>
                                            { matches1440 ? 'Bathrooms' : <Image src={bathroom} />}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.price}>
                                    <div className={styles.price__value}>
                                        { attributes.edges.map((price) => { if (price.node.name === 'Price') {return price.node.options[0]} }) }
                                    </div>
                                    <div className={styles.price__currency}>
                                        USD
                                    </div>
                                </div>
                                <div className={styles.item__btn}>
                                    Call me
                                </div>
                            </div>
                            { matches && index % 7 === 0 ? <div className={styles.item__gallery}>
                                    <Swiper
                                        spaceBetween={0}
                                        slidesPerView={"auto"}
                                        loop={false}
                                        modules={[Pagination]}
                                        pagination={{
                                            clickable: true,
                                            renderBullet: function(index, className) {
                                                return '<div class="' + className + '">' + '</div>';
                                            }
                                        }}
                                        className="item__swiper"
                                    >
                                        { galleryImages.edges.map((slide, index) => {
                                            return <SwiperSlide key={index}>
                                                <div className={styles.slide__image}>
                                                    <Image src={slide.node.mediaItemUrl} layout={"fill"}/>
                                                </div>
                                            </SwiperSlide>
                                        }) }
                                    </Swiper>
                                </div>
                                :
                                null
                            }

                        </div>
                    )
                })}
            </div>
            { haveMoreProducts ? (
                <form
                    method="post"
                    onSubmit={(event) => {
                        event.preventDefault();
                        console.log(data.products?.pageInfo.endCursor)
                        fetchMore({ variables: { after: data.products.pageInfo.endCursor }});
                    }}
                >
                    <button className={styles.items__more_btn} type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Show more"}
                    </button>
                </form>
            ) : (
                ""
            )}
        </div>
        )

}