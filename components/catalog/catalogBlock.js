import Image from "next/image";
import Link from "next/link";
import globus from '/public/globus.svg'
import sqm from '/public/sqm.svg'
import bedroom from '/public/bedroom.svg'
import bathroom from '/public/bathroom.svg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import {client} from "../../lib/apollo";
import {useQuery, gql, empty} from "@apollo/client";
import useMediaQuery from "@mui/material/useMediaQuery";

import 'swiper/css';
import "swiper/css/pagination";
import styles from '/styles/catalogBlock.module.css'
import arrow__black from "../../public/arrow__black.svg";
import arrow__white from "../../public/arrow__white.svg";
import {useEffect, useState} from "react";

export default function CatalogBlock({ filter }) {

    const [countriesId, setCountriesId] = useState([])
    const [isCountryListOpen, setCountryListOpen] = useState(true)
    const [isCountryItemPicked, setCountryItemPicked] = useState(false)
    
    const [isPriceListOpen, setPriceListOpen] = useState(false)
    const [isMinPriceItemPicked, setMinPriceItemPicked] = useState(false)
    const [isMaxPriceItemPicked, setMaxPriceItemPicked] = useState(false)
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    let minFloat = parseFloat(minPrice)
    let maxFloat = parseFloat(maxPrice)

    const [typeId, setTypeId] = useState([])
    const [isTypeListOpen, setTypeListOpen] = useState(false)
    const [isTypeItemPicked, setTypeItemPicked] = useState(false)



    useEffect(() => {
        { countriesId.length > 0 ? setCountryItemPicked(true) : setCountryItemPicked(false)}
        { typeId.length > 0 ? setTypeItemPicked(true) : setTypeItemPicked(false)}
        { !isNaN(minFloat) ? setMinPriceItemPicked(true) : setMinPriceItemPicked(false)}
        { !isNaN(maxFloat) ? setMaxPriceItemPicked(true) : setMaxPriceItemPicked(false)}
        client.refetchQueries({
            include: [GET_PRODUCTS],
        });
        console.log('Refetched')
    }, [countriesId, minPrice, maxPrice, typeId])

    function handleCountryCheck(countryId) {
        { countriesId.includes(countryId) ? setCountriesId(countriesId.filter(e => e !== countryId)) : setCountriesId([...countriesId, countryId]) }
    }
    function countryList() {
        setCountryListOpen(!isCountryListOpen)
    }
    function clearCountry() {
        setCountriesId([])
    }


    function priceList() {
        setPriceListOpen(!isPriceListOpen)
    }
    function clearPrice() {
        setMinPrice('')
        setMaxPrice('')
    }

    function handleTypeCheck(id) {
        { typeId.includes(id) ? setTypeId(typeId.filter(e => e !== id)) : setTypeId([...typeId, id]) }
    }
    function typeList() {
        setTypeListOpen(!isTypeListOpen)
    }
    function clearType() {
        setTypeId([])
    }

    function handleMinChange(e) {
        setMinPrice(e.target.value)
    }

    function handleMaxChange(e) {
        setMaxPrice(e.target.value)
    }


    const GET_PRODUCTS = gql`
        query getAllProducts(
            $first: Int!,
            $after: String,
            $categoryId: [Int],
            $minPrice: Float,
            $maxPrice: Float
        ) {
          products(
              first: $first, 
              after: $after,
              where: {categoryIdIn: $categoryId, minPrice: $minPrice, maxPrice: $maxPrice}
          ) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                slug
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
                productCategories(
                    first: 100,
                        ) {
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
              }
            }
          }
        }
    `

    const BATCH_SIZE = 8;

    const { productCategories, products } = filter

    console.log(products)

    const matches = useMediaQuery('(min-width:768px)')
    const matches1440 = useMediaQuery('(min-width:1440px)')

    const { data, loading, error, fetchMore } = useQuery(GET_PRODUCTS, {
        variables: { first: BATCH_SIZE, after: null, categoryId: typeId.concat(countriesId), minPrice: minFloat, maxPrice: maxFloat}
    });

    if (error) {
        console.log(error)
        return <p>Sorry, an error has occurred. Please reload the page.</p>;
    }
    if (!data && loading) {
        return <p className={styles.loading}>Loading...</p>;
    }
    if (!data?.products.edges.length) {
        return <p>No posts have been published.</p>;
    }

    const productItems = data.products.edges.map((edge) => edge.node);
    const haveMoreProducts = Boolean(data?.products?.pageInfo?.hasNextPage);

    const countryCategory = 31
    const propertyTypeCategory = 35

    return (
        <>
        <div className={styles.catalog__wrap}>
            <div className={styles.catalog__items}>
                { productItems.map((product, index) => {

                    const { id, name, image, galleryImages, productCategories, attributes, slug } = product;

                    return (
                        <div className={styles.item} key={id} data-id={index}>
                            <Link href={`/catalog/${slug}`}>
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
                            </Link>
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
        <div className={styles.sidebar}>
            <div className={styles.filter__wrap}>
                {isCountryItemPicked ? <div className={styles.clear} onClick={() => clearCountry()}>
                        Clear
                    </div>
                    :
                    null
                }
                <div className={styles.filter}>
                    <div className={isCountryItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => countryList()}>
                        <div className={isCountryItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                            country
                        </div>
                        <div className={isCountryListOpen ? styles.filter__icon_open : styles.filter__icon}>
                            { isCountryItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                        </div>
                    </div>
                    {isCountryListOpen ?
                        <div className={styles.filter__list}>
                            { productCategories.edges.map((category, index) => {
                                if (category.node.parentDatabaseId === countryCategory) {
                                    return <div className={styles.filter__item} key={index} onClick={() => handleCountryCheck(category.node.databaseId)}>
                                        <div className={styles.filter__name}>
                                            { category.node.name }
                                        </div>
                                        <div className={styles.filter__checkbox}>
                                            { countriesId.map((id, index) => { if (id === category.node.databaseId) { return <div key={index} className={styles.filter__checkbox_checked}/> } }) }
                                        </div>
                                    </div>
                                }
                            })}
                        </div>
                        :
                        null
                    }
                </div>
            </div>
            <div className={styles.filter__wrap}>
                {isMinPriceItemPicked || isMaxPriceItemPicked ? <div className={styles.clear} onClick={() => clearPrice()}>
                        Clear
                    </div>
                    :
                    null
                }
                <div className={styles.filter}>
                    <div className={ isMinPriceItemPicked || isMaxPriceItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => priceList() }>
                        <div className={ isMinPriceItemPicked || isMaxPriceItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title }>
                            Price
                        </div>
                        <div className={isPriceListOpen ? styles.filter__icon_open : styles.filter__icon}>
                            { isMinPriceItemPicked || isMaxPriceItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                        </div>
                    </div>
                    { isPriceListOpen ?
                        <div className={styles.filter__list}>
                            <div className={styles.currency}>USD</div>
                            <div className={styles.filter__interval}>
                                <div className={styles.number__input}>
                                    <input type="number" min="0" value={minPrice} className={ isMinPriceItemPicked ? `${styles.input__number_picked} ${styles.input__number}` : styles.input__number} onChange={handleMinChange} />
                                    <div className={styles.label}>
                                        min
                                    </div>
                                </div>
                                <div className={styles.number__input}>
                                    <input type="number" min="0" value={maxPrice} className={ isMaxPriceItemPicked ? `${styles.input__number_picked} ${styles.input__number}` : styles.input__number} onChange={handleMaxChange} />
                                    <div className={styles.label}>
                                        max
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
            <div className={styles.filter__wrap}>
                { isTypeItemPicked ? <div className={styles.clear} onClick={() => clearType()}>
                        Clear
                    </div>
                    :
                    null
                }
                <div className={styles.filter}>
                    <div className={isTypeItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => typeList()}>
                        <div className={isTypeItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                            Property type
                        </div>
                        <div className={isTypeListOpen ? styles.filter__icon_open : styles.filter__icon}>
                            { isTypeItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                        </div>
                    </div>
                    { isTypeListOpen ?
                        <div className={styles.filter__list}>
                            { productCategories.edges.map((category, index) => {
                                if (category.node.parentDatabaseId === propertyTypeCategory) {
                                    return <div className={styles.filter__item} key={index} onClick={() => handleTypeCheck(category.node.databaseId)}>
                                        <div className={styles.filter__name}>
                                            { category.node.name }
                                        </div>
                                        <div className={styles.filter__checkbox}>
                                            { typeId.map((id, index) => { if (id === category.node.databaseId) { return <div key={index} className={styles.filter__checkbox_checked}/> } }) }
                                        </div>
                                    </div>
                                }
                            })}
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </div>
        </>
        )

}