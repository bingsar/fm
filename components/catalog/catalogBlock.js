import Image from "next/image";
import Link from "next/link";
import filter__icon from "../../public/filter.svg";
import globus from '/public/globus.svg'
import sqm from '/public/sqm.svg'
import bedroom from '/public/bedroom.svg'
import bathroom from '/public/bathroom.svg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { client } from "../../lib/apollo";
import { useQuery, gql } from "@apollo/client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";
import CurrentPrice from "./currentPrice";

import 'swiper/css';
import "swiper/css/pagination";
import styles from '/styles/catalogBlock.module.css'
import arrow__black from "../../public/arrow__black.svg";
import arrow__white from "../../public/arrow__white.svg";
import { useEffect, useState } from "react";
import useAppContext from "../../src/store";

export default function CatalogBlock({ filter }) {

    const { ctxCountry, setCtxCountry } = useAppContext()

    const [currency, setCurrency] = useState()
    
    const { productCategories, products } = filter

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

    const bedroomsCount = ['1','2','3','4','5']
    const [bedroomsSelected, setBedroomsSelected] = useState([])
    const [isBedroomsListOpen, setBedroomsListOpen] = useState(false)
    const [isBedroomsItemPicked, setBedroomsItemPicked] = useState(false)

    const bathroomsCount = ['1','2','3','4','5']
    const [bathroomsSelected, setBathroomsSelected] = useState([])
    const [isBathroomsListOpen, setBathroomsListOpen] = useState(false)
    const [isBathroomsItemPicked, setBathroomsItemPicked] = useState(false)

    const [outdoorId, setOutdoorId] = useState([])
    const [isOutdoorListOpen, setOutdoorListOpen] = useState(false)
    const [isOutdoorItemPicked, setOutdoorItemPicked] = useState(false)

    const [isSqmListOpen, setSqmListOpen] = useState(false)
    const [isMinSqmItemPicked, setMinSqmItemPicked] = useState(false)
    const [isMaxSqmItemPicked, setMaxSqmItemPicked] = useState(false)
    const [minSqm, setMinSqm] = useState('')
    const [maxSqm, setMaxSqm] = useState('')
    const [sqmQuery, setSqmQuery] = useState([])
    let minSqmArray = []
    let maxSqmArray = []

    const [isMobileMenuFilterOpen, setMobileMenuFilterOpen] = useState(false)
    const sidebar = {
        hidden: { y: 0 },
        show: {
            animate: {y:100},
        }
    }


    function mobileMenuHandler() {
        setMobileMenuFilterOpen(!isMobileMenuFilterOpen)
    }


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
    function handleMinChange(e) {
        setMinPrice(e.target.value)
    }
    function handleMaxChange(e) {
        setMaxPrice(e.target.value)
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

    function allBedroomsMore5(products) {
        let bedroomsMore = []

        products.edges?.map((bedrooms) => {
            bedrooms.node.attributes.edges?.map((bedroom) => {
                { bedroom.node.name === 'Bedrooms' && bedroom.node.options[0] >=5 && !bedroomsMore.includes(bedroom.node.options[0]) ? bedroomsMore.push(bedroom.node.options[0]) : null }
            })
        })

        return bedroomsMore
    }
    function handleBedroomsCheck(i) {
        if (i === '5') {
            let deleteSet = new Set(allBedroomsMore5(products));
            { allBedroomsMore5(products).some((x => bedroomsSelected.includes(x))) ? allBedroomsMore5(products).some((ai) => { setBedroomsSelected(bedroomsSelected.filter(e => !deleteSet.has(e)))}) : setBedroomsSelected(bedroomsSelected.concat(allBedroomsMore5(products))) }
        } else {
            { bedroomsSelected.includes(i) ? setBedroomsSelected(bedroomsSelected.filter(e => e !== i)) : setBedroomsSelected([...bedroomsSelected, i]) }
        }
    }
    function bedroomsList() {
        setBedroomsListOpen(!isBedroomsListOpen)
    }
    function clearBedrooms() {
        setBedroomsSelected([])
    }

    function allBathroomsMore5(products) {
        let bathroomsMore = []

        products.edges?.map((bathrooms) => {
            bathrooms.node.attributes.edges?.map((bathroom) => {
                { bathroom.node.name === 'Bathrooms' && bathroom.node.options[0] >=5 && !bathroomsMore.includes(bathroom.node.options[0]) ? bathroomsMore.push(bathroom.node.options[0]) : null }
            })
        })

        return bathroomsMore
    }
    function handleBathroomsCheck(i) {
        if (i === '5') {
            let deleteSet = new Set(allBathroomsMore5(products));
            { allBathroomsMore5(products).some((x => bathroomsSelected.includes(x))) ? allBathroomsMore5(products).some((ai) => { setBathroomsSelected(bathroomsSelected.filter(e => !deleteSet.has(e)))}) : setBathroomsSelected(bathroomsSelected.concat(allBathroomsMore5(products))) }
        } else {
            { bathroomsSelected.includes(i) ? setBathroomsSelected(bathroomsSelected.filter(e => e !== i)) : setBathroomsSelected([...bathroomsSelected, i]) }
        }
    }
    function bathroomsList() {
        setBathroomsListOpen(!isBathroomsListOpen)
    }
    function clearBathrooms() {
        setBathroomsSelected([])
    }

    function handleOutdoorCheck(id) {
        { outdoorId.includes(id) ? setOutdoorId(outdoorId.filter(e => e !== id)) : setOutdoorId([...outdoorId, id]) }
    }
    function outdoorList() {
        setOutdoorListOpen(!isOutdoorListOpen)
    }
    function clearOutdoor() {
        setOutdoorId([])
    }

    function sqmList() {
        setSqmListOpen(!isSqmListOpen)
    }
    function clearSqm() {
        setMinSqm('')
        setMaxSqm('')
        setSqmQuery('')
    }
    function handleMinSqmChange(e) {
        setMinSqm(e.target.value)

        if (maxSqm === '') {
            for (let i = e.target.value; i < 2000; i++) {
                minSqmArray.push(String(i))
            }
        }
        if (maxSqm !== '') {
            for (let i = minSqm; i < maxSqm; i++) {
                minSqmArray.push(String(i))
            }
        }

        setSqmQuery(minSqmArray)
    }
    function handleMaxSqmChange(e) {
        setMaxSqm(e.target.value)

        if (minSqm === '') {
            for (let i = 0; i < e.target.value; i++) {
                maxSqmArray.push(String(i))
            }
        }
        if (minSqm !== '') {
            for (let i = minSqm; i < maxSqm; i++) {
                maxSqmArray.push(String(i))
            }
        }

        setSqmQuery(maxSqmArray)
    }


    //REFETCH DATA
    useEffect(() => {
        setCountriesId([parseInt(ctxCountry)])
    }, [ctxCountry])

    useEffect(() => {
        { countriesId.length > 0 ? setCountryItemPicked(true) : setCountryItemPicked(false)}
        { typeId.length > 0 ? setTypeItemPicked(true) : setTypeItemPicked(false)}
        { bedroomsSelected.length > 0 ? setBedroomsItemPicked(true) : setBedroomsItemPicked(false)}
        { bathroomsSelected.length > 0 ? setBathroomsItemPicked(true) : setBathroomsItemPicked(false)}
        { outdoorId.length > 0 ? setOutdoorItemPicked(true) : setOutdoorItemPicked(false)}
        { !isNaN(minFloat) ? setMinPriceItemPicked(true) : setMinPriceItemPicked(false)}
        { !isNaN(maxFloat) ? setMaxPriceItemPicked(true) : setMaxPriceItemPicked(false)}
        { minSqm !== '' ? setMinSqmItemPicked(true) : setMinSqmItemPicked(false)}
        { maxSqm !== '' ? setMaxSqmItemPicked(true) : setMaxSqmItemPicked(false)}
        client.refetchQueries({
            include: [GET_PRODUCTS],
        });
        console.log('Refetched')
    }, [countriesId, minPrice, maxPrice, typeId, bedroomsSelected, bathroomsSelected, outdoorId, sqmQuery, minSqm, maxSqm])


    //DATA FETCHING
    const GET_PRODUCTS = gql`
        query getAllProducts(
            $first: Int!,
            $after: String,
            $categoryId: [Int],
            $minPrice: Float,
            $maxPrice: Float,
            $bedroomsNumber: [String],
            $bathroomsNumber: [String],
            $sqmQuery: [String],
            $typeId: [Int],
            $outdoorId: [Int]
        ) {
          products(
              first: $first, 
              after: $after,
              where: {
                        taxonomyFilter: {filters: [
                                {taxonomy: PRODUCTCATEGORY, operator: IN, ids: $categoryId},
                                {taxonomy: PRODUCTCATEGORY, operator: IN, ids: $typeId},
                                {taxonomy: PRODUCTCATEGORY, operator: IN, ids: $outdoorId},
                                {taxonomy: PABEDROOMS, operator: IN, terms: $bedroomsNumber},
                                {taxonomy: PABATHROOMS, operator: IN, terms: $bathroomsNumber},  
                                {taxonomy: PASQM, operator: IN, terms: $sqmQuery},  
                            ], relation: AND
                        }
                        minPrice: $minPrice,
                        maxPrice: $maxPrice,
                      }
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
                      attributeId
                    }
                  }
                }
              }
            }
          }
        }
    `

    const BATCH_SIZE = 8;

    const matches = useMediaQuery('(min-width:768px)')
    const matches1440 = useMediaQuery('(min-width:1440px)')

    const { data, loading, error, fetchMore } = useQuery(GET_PRODUCTS, {
        variables: { first: BATCH_SIZE, after: null, categoryId: countriesId, typeId: typeId, outdoorId: outdoorId, bedroomsNumber: bedroomsSelected, bathroomsNumber: bathroomsSelected, minPrice: minFloat, maxPrice: maxFloat, sqmQuery: sqmQuery}
    });

    const countryCategory = 31
    const propertyTypeCategory = 35
    const outdoorCategory = 92
    
    if (error) {
        console.log(error)
        return <>
            <div className={styles.hero__breadcrumbs}>
                <Link href="/"><a className="link">Home</a></Link>/ Estate Catalog.
            </div>
            <div className={styles.hero__title}>
                REAL ESTATE CATALOG.
            </div>
            <div className={styles.hero__addCatalog__btn_wrap}>
                { !matches ?
                    <div className={styles.hero__filter__icon} onClick={() => mobileMenuHandler()}> <Image src={filter__icon}/></div>
                    :
                    null
                }
                <div className={styles.hero__addCatalog__btn}>
                    <div className={styles.hero__btn__text}>
                        add your real estate
                    </div>
                    { matches ?
                        <div className={styles.hero__btn__icon}> </div>
                        :
                        null
                    }
                </div>
                { matches ?
                    <div className={styles.hero__addCatalog__text}>
                        Add your properties into
                        the F&M real estate catalog.
                    </div>
                    :
                    null
                }
            </div>
            <div className={styles.catalog__container}>
                <div className={styles.catalog__wrap}>
                    <p className={styles.loading}>Sorry, an error has occurred. Please reload the page.</p>;
                </div>
                <motion.div variants={sidebar}
                            initial="hidden"
                            animate="show"
                            className={styles.sidebar}>
                    { !matches ? <div className={styles.sidebar__title}>Filters <div className={styles.sidebar__close} onClick={() => mobileMenuHandler()}>Close</div></div> : null }
                    <div className={styles.filter__wrap}>
                        {isCountryItemPicked ? <div className={styles.clear} onClick={() => clearCountry()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
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
                                    { productCategories.edges?.map((category, index) => {
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
                        <div>
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
                        <div>
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
                                    { productCategories.edges?.map((category, index) => {
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
                    <div className={styles.filter__wrap}>
                        { isBedroomsItemPicked ? <div className={styles.clear} onClick={() => clearBedrooms()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
                            <div className={isBedroomsItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => bedroomsList()}>
                                <div className={isBedroomsItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                    Bedrooms
                                </div>
                                <div className={isBedroomsListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                    { isBedroomsItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                                </div>
                            </div>
                            { isBedroomsListOpen ?
                                <div className={styles.filter__list}>
                                    { bedroomsCount.map((i, index) => {
                                        return <div className={styles.filter__item} key={index} onClick={() => handleBedroomsCheck(i)}>
                                            <div className={`${styles.filter__name} ${styles.filter__name_attribute}`}>
                                                { i }
                                            </div>
                                            <div className={styles.filter__checkbox}>
                                                { bedroomsSelected.map((id, index) => {
                                                    if (id === i && i !== '5') {
                                                        return <div key={index} className={styles.filter__checkbox_checked}/>
                                                    }
                                                    if (allBedroomsMore5(products).includes(id) && i === '5') {
                                                        return <div key={index} className={styles.filter__checkbox_checked}/>
                                                    }
                                                }) }
                                            </div>
                                        </div>
                                    })}
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                    <div className={styles.filter__wrap}>
                        {isMinSqmItemPicked || isMaxSqmItemPicked ? <div className={styles.clear} onClick={() => clearSqm()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
                            <div className={ isMinSqmItemPicked || isMaxSqmItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => sqmList() }>
                                <div className={ isMinSqmItemPicked || isMaxSqmItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title }>
                                    square footage
                                </div>
                                <div className={isSqmListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                    { isMinSqmItemPicked || isMaxSqmItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                                </div>
                            </div>
                            { isSqmListOpen ?
                                <div className={styles.filter__list}>
                                    <div className={styles.filter__interval}>
                                        <div className={styles.number__input}>
                                            <input type="number" min="0" max="2000" value={minSqm} className={ isMinSqmItemPicked ? `${styles.input__number_picked} ${styles.input__number}` : styles.input__number} onChange={handleMinSqmChange} />
                                            <div className={styles.label}>
                                                min
                                            </div>
                                        </div>
                                        <div className={styles.number__input}>
                                            <input type="number" min="0" max="2000" value={maxSqm} className={ isMaxSqmItemPicked ? `${styles.input__number_picked} ${styles.input__number}` : styles.input__number} onChange={handleMaxSqmChange} />
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
                        { isBathroomsItemPicked ? <div className={styles.clear} onClick={() => clearBathrooms()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
                            <div className={isBathroomsItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => bathroomsList()}>
                                <div className={isBathroomsItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                    Bathrooms
                                </div>
                                <div className={isBathroomsListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                    { isBathroomsItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                                </div>
                            </div>
                            { isBathroomsListOpen ?
                                <div className={styles.filter__list}>
                                    { bathroomsCount.map((i, index) => {
                                        return <div className={styles.filter__item} key={index} onClick={() => handleBathroomsCheck(i)}>
                                            <div className={`${styles.filter__name} ${styles.filter__name_attribute}`}>
                                                { i }
                                            </div>
                                            <div className={styles.filter__checkbox}>
                                                { bathroomsSelected.map((id, index) => {
                                                    if (id === i && i !== '5') {

                                                        return <div key={index} className={styles.filter__checkbox_checked}/>
                                                    }
                                                    if (allBathroomsMore5(products).includes(id) && i === '5') {
                                                        return <div key={index} className={styles.filter__checkbox_checked}/>
                                                    }
                                                }) }
                                            </div>
                                        </div>
                                    })}
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                    <div className={styles.filter__wrap}>
                        {isOutdoorItemPicked ? <div className={styles.clear} onClick={() => clearOutdoor()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
                            <div className={isOutdoorItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => outdoorList()}>
                                <div className={isOutdoorItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                    Additional
                                </div>
                                <div className={isOutdoorListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                    { isOutdoorItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                                </div>
                            </div>
                            {isOutdoorListOpen ?
                                <div className={styles.filter__list}>
                                    { productCategories.edges?.map((category, index) => {
                                        if (category.node.parentDatabaseId === outdoorCategory) {
                                            return <div className={styles.filter__item} key={index} onClick={() => handleOutdoorCheck(category.node.databaseId)}>
                                                <div className={styles.filter__name}>
                                                    { category.node.name }
                                                </div>
                                                <div className={styles.filter__checkbox}>
                                                    { outdoorId.map((id, index) => { if (id === category.node.databaseId) { return <div key={index} className={styles.filter__checkbox_checked}/> } }) }
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
                </motion.div>
            </div>
        </>

    }
    if (!data && loading) {
        return <>
            <div className={styles.hero__breadcrumbs}>
                <Link href="/"><a className="link">Home</a></Link>/ Estate Catalog.
            </div>
            <div className={styles.hero__title}>
                REAL ESTATE CATALOG.
            </div>
            <div className={styles.hero__addCatalog__btn_wrap}>
                { !matches ?
                    <div className={styles.hero__filter__icon} onClick={() => mobileMenuHandler()}> <Image src={filter__icon}/></div>
                    :
                    null
                }
                <div className={styles.hero__addCatalog__btn}>
                    <div className={styles.hero__btn__text}>
                        add your real estate
                    </div>
                    { matches ?
                        <div className={styles.hero__btn__icon}> </div>
                        :
                        null
                    }
                </div>
                { matches ?
                    <div className={styles.hero__addCatalog__text}>
                        Add your properties into
                        the F&M real estate catalog.
                    </div>
                    :
                    null
                }
            </div>
            <div className={styles.catalog__container}>
                <div className={styles.catalog__wrap}>
                    <p className={styles.loading}>Loading...</p>
                </div>
                <div className={styles.sidebar}>
                    { !matches ? <div className={styles.sidebar__title}>Filters <div className={styles.sidebar__close} onClick={() => mobileMenuHandler()}>Close</div></div> : null }
                    <div className={styles.filter__wrap}>
                        {isCountryItemPicked ? <div className={styles.clear} onClick={() => clearCountry()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
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
                                    { productCategories.edges?.map((category, index) => {
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
                        <div>
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
                        <div>
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
                                    { productCategories.edges?.map((category, index) => {
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
                    <div className={styles.filter__wrap}>
                        { isBedroomsItemPicked ? <div className={styles.clear} onClick={() => clearBedrooms()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
                            <div className={isBedroomsItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => bedroomsList()}>
                                <div className={isBedroomsItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                    Bedrooms
                                </div>
                                <div className={isBedroomsListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                    { isBedroomsItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                                </div>
                            </div>
                            { isBedroomsListOpen ?
                                <div className={styles.filter__list}>
                                    { bedroomsCount.map((i, index) => {
                                        return <div className={styles.filter__item} key={index} onClick={() => handleBedroomsCheck(i)}>
                                            <div className={`${styles.filter__name} ${styles.filter__name_attribute}`}>
                                                { i }
                                            </div>
                                            <div className={styles.filter__checkbox}>
                                                { bedroomsSelected.map((id, index) => {
                                                    if (id === i && i !== '5') {

                                                        return <div key={index} className={styles.filter__checkbox_checked}/>
                                                    }
                                                    if (allBedroomsMore5(products).includes(id) && i === '5') {
                                                        return <div key={index} className={styles.filter__checkbox_checked}/>
                                                    }
                                                }) }
                                            </div>
                                        </div>
                                    })}
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                    <div className={styles.filter__wrap}>
                        {isMinSqmItemPicked || isMaxSqmItemPicked ? <div className={styles.clear} onClick={() => clearSqm()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
                            <div className={ isMinSqmItemPicked || isMaxSqmItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => sqmList() }>
                                <div className={ isMinSqmItemPicked || isMaxSqmItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title }>
                                    square footage
                                </div>
                                <div className={isSqmListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                    { isMinSqmItemPicked || isMaxSqmItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                                </div>
                            </div>
                            { isSqmListOpen ?
                                <div className={styles.filter__list}>
                                    <div className={styles.filter__interval}>
                                        <div className={styles.number__input}>
                                            <input type="number" min="0" max="2000" value={minSqm} className={ isMinSqmItemPicked ? `${styles.input__number_picked} ${styles.input__number}` : styles.input__number} onChange={handleMinSqmChange} />
                                            <div className={styles.label}>
                                                min
                                            </div>
                                        </div>
                                        <div className={styles.number__input}>
                                            <input type="number" min="0" max="2000" value={maxSqm} className={ isMaxSqmItemPicked ? `${styles.input__number_picked} ${styles.input__number}` : styles.input__number} onChange={handleMaxSqmChange} />
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
                        { isBathroomsItemPicked ? <div className={styles.clear} onClick={() => clearBathrooms()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
                            <div className={isBathroomsItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => bathroomsList()}>
                                <div className={isBathroomsItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                    Bathrooms
                                </div>
                                <div className={isBathroomsListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                    { isBathroomsItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                                </div>
                            </div>
                            { isBathroomsListOpen ?
                                <div className={styles.filter__list}>
                                    { bathroomsCount.map((i, index) => {
                                        return <div className={styles.filter__item} key={index} onClick={() => handleBathroomsCheck(i)}>
                                            <div className={`${styles.filter__name} ${styles.filter__name_attribute}`}>
                                                { i }
                                            </div>
                                            <div className={styles.filter__checkbox}>
                                                { bathroomsSelected.map((id, index) => {
                                                    if (id === i && i !== '5') {

                                                        return <div key={index} className={styles.filter__checkbox_checked}/>
                                                    }
                                                    if (allBathroomsMore5(products).includes(id) && i === '5') {
                                                        return <div key={index} className={styles.filter__checkbox_checked}/>
                                                    }
                                                }) }
                                            </div>
                                        </div>
                                    })}
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                    <div className={styles.filter__wrap}>
                        {isOutdoorItemPicked ? <div className={styles.clear} onClick={() => clearOutdoor()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
                            <div className={isOutdoorItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => outdoorList()}>
                                <div className={isOutdoorItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                    Additional
                                </div>
                                <div className={isOutdoorListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                    { isOutdoorItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                                </div>
                            </div>
                            {isOutdoorListOpen ?
                                <div className={styles.filter__list}>
                                    { productCategories.edges?.map((category, index) => {
                                        if (category.node.parentDatabaseId === outdoorCategory) {
                                            return <div className={styles.filter__item} key={index} onClick={() => handleOutdoorCheck(category.node.databaseId)}>
                                                <div className={styles.filter__name}>
                                                    { category.node.name }
                                                </div>
                                                <div className={styles.filter__checkbox}>
                                                    { outdoorId.map((id, index) => { if (id === category.node.databaseId) { return <div key={index} className={styles.filter__checkbox_checked}/> } }) }
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
            </div>
        </>;
    }
    if (!data?.products.edges?.length) {
        return <>
            <div className={styles.hero__breadcrumbs}>
                <Link href="/"><a className="link">Home</a></Link>/ Estate Catalog.
            </div>
            <div className={styles.hero__title}>
                REAL ESTATE CATALOG.
            </div>
            <div className={styles.hero__addCatalog__btn_wrap}>
                { !matches ?
                    <div className={styles.hero__filter__icon} onClick={() => mobileMenuHandler()}> <Image src={filter__icon}/></div>
                    :
                    null
                }
                <div className={styles.hero__addCatalog__btn}>
                    <div className={styles.hero__btn__text}>
                        add your real estate
                    </div>
                    { matches ?
                        <div className={styles.hero__btn__icon}> </div>
                        :
                        null
                    }
                </div>
                { matches ?
                    <div className={styles.hero__addCatalog__text}>
                        Add your properties into
                        the F&M real estate catalog.
                    </div>
                    :
                    null
                }
            </div>
            <div className={styles.catalog__container}>
                <div className={styles.catalog__wrap}>
                    <p className={styles.loading}>No posts have been published.</p>
                </div>
                <div className={styles.sidebar}>
                    { !matches ? <div className={styles.sidebar__title}>Filters <div className={styles.sidebar__close} onClick={() => mobileMenuHandler()}>Close</div></div> : null }
                    <div className={styles.filter__wrap}>
                        {isCountryItemPicked ? <div className={styles.clear} onClick={() => clearCountry()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
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
                                    { productCategories.edges?.map((category, index) => {
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
                        <div>
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
                        <div>
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
                                    { productCategories.edges?.map((category, index) => {
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
                    <div className={styles.filter__wrap}>
                        { isBedroomsItemPicked ? <div className={styles.clear} onClick={() => clearBedrooms()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
                            <div className={isBedroomsItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => bedroomsList()}>
                                <div className={isBedroomsItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                    Bedrooms
                                </div>
                                <div className={isBedroomsListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                    { isBedroomsItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                                </div>
                            </div>
                            { isBedroomsListOpen ?
                                <div className={styles.filter__list}>
                                    { bedroomsCount.map((i, index) => {
                                        return <div className={styles.filter__item} key={index} onClick={() => handleBedroomsCheck(i)}>
                                            <div className={`${styles.filter__name} ${styles.filter__name_attribute}`}>
                                                { i }
                                            </div>
                                            <div className={styles.filter__checkbox}>
                                                { bedroomsSelected.map((id, index) => {
                                                    if (id === i && i !== '5') {

                                                        return <div key={index} className={styles.filter__checkbox_checked}/>
                                                    }
                                                    if (allBedroomsMore5(products).includes(id) && i === '5') {
                                                        return <div key={index} className={styles.filter__checkbox_checked}/>
                                                    }
                                                }) }
                                            </div>
                                        </div>
                                    })}
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                    <div className={styles.filter__wrap}>
                        {isMinSqmItemPicked || isMaxSqmItemPicked ? <div className={styles.clear} onClick={() => clearSqm()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
                            <div className={ isMinSqmItemPicked || isMaxSqmItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => sqmList() }>
                                <div className={ isMinSqmItemPicked || isMaxSqmItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title }>
                                    square footage
                                </div>
                                <div className={isSqmListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                    { isMinSqmItemPicked || isMaxSqmItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                                </div>
                            </div>
                            { isSqmListOpen ?
                                <div className={styles.filter__list}>
                                    <div className={styles.filter__interval}>
                                        <div className={styles.number__input}>
                                            <input type="number" min="0" max="2000" value={minSqm} className={ isMinSqmItemPicked ? `${styles.input__number_picked} ${styles.input__number}` : styles.input__number} onChange={handleMinSqmChange} />
                                            <div className={styles.label}>
                                                min
                                            </div>
                                        </div>
                                        <div className={styles.number__input}>
                                            <input type="number" min="0" max="2000" value={maxSqm} className={ isMaxSqmItemPicked ? `${styles.input__number_picked} ${styles.input__number}` : styles.input__number} onChange={handleMaxSqmChange} />
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
                        { isBathroomsItemPicked ? <div className={styles.clear} onClick={() => clearBathrooms()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
                            <div className={isBathroomsItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => bathroomsList()}>
                                <div className={isBathroomsItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                    Bathrooms
                                </div>
                                <div className={isBathroomsListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                    { isBathroomsItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                                </div>
                            </div>
                            { isBathroomsListOpen ?
                                <div className={styles.filter__list}>
                                    { bathroomsCount.map((i, index) => {
                                        return <div className={styles.filter__item} key={index} onClick={() => handleBathroomsCheck(i)}>
                                            <div className={`${styles.filter__name} ${styles.filter__name_attribute}`}>
                                                { i }
                                            </div>
                                            <div className={styles.filter__checkbox}>
                                                { bathroomsSelected.map((id, index) => {
                                                    if (id === i && i !== '5') {

                                                        return <div key={index} className={styles.filter__checkbox_checked}/>
                                                    }
                                                    if (allBathroomsMore5(products).includes(id) && i === '5') {
                                                        return <div key={index} className={styles.filter__checkbox_checked}/>
                                                    }
                                                }) }
                                            </div>
                                        </div>
                                    })}
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                    <div className={styles.filter__wrap}>
                        {isOutdoorItemPicked ? <div className={styles.clear} onClick={() => clearOutdoor()}>
                                Clear
                            </div>
                            :
                            null
                        }
                        <div>
                            <div className={isOutdoorItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar} onClick={() => outdoorList()}>
                                <div className={isOutdoorItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                    Additional
                                </div>
                                <div className={isOutdoorListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                    { isOutdoorItemPicked ? <Image src={arrow__white} /> : <Image src={arrow__black} /> }
                                </div>
                            </div>
                            {isOutdoorListOpen ?
                                <div className={styles.filter__list}>
                                    { productCategories.edges?.map((category, index) => {
                                        if (category.node.parentDatabaseId === outdoorCategory) {
                                            return <div className={styles.filter__item} key={index} onClick={() => handleOutdoorCheck(category.node.databaseId)}>
                                                <div className={styles.filter__name}>
                                                    { category.node.name }
                                                </div>
                                                <div className={styles.filter__checkbox}>
                                                    { outdoorId.map((id, index) => { if (id === category.node.databaseId) { return <div key={index} className={styles.filter__checkbox_checked}/> } }) }
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
            </div>
        </>
    }

    const productItems = data.products.edges?.map((edge) => edge.node);
    const haveMoreProducts = Boolean(data?.products?.pageInfo?.hasNextPage);

    return (
        <>
            <div className={styles.hero__breadcrumbs}>
                <Link href="/"><a className="link">Home</a></Link>/ Estate Catalog.
            </div>
            <div className={styles.hero__title}>
                REAL ESTATE CATALOG.
            </div>
            <div className={styles.hero__addCatalog__btn_wrap}>
                { !matches ?
                    <div className={styles.hero__filter__icon} onClick={() => mobileMenuHandler()}><Image src={filter__icon}/></div>
                    :
                    null
                }
                <div className={styles.hero__addCatalog__btn}>
                    <div className={styles.hero__btn__text}>
                        add your real estate
                    </div>
                    { matches ?
                        <div className={styles.hero__btn__icon}> </div>
                        :
                        null
                    }
                </div>
                { matches ?
                    <div className={styles.hero__addCatalog__text}>
                        Add your properties into
                        the F&M real estate catalog.
                    </div>
                    :
                    null
                }
            </div>
            <div className={styles.catalog__container}>
                <div className={styles.catalog__wrap}>
                    <div className={styles.catalog__items}>
                        { productItems.map((product, index) => {

                            const { id, name, image, galleryImages, productCategories, attributes, slug } = product;

                            const handleCurrency = (e) => {
                                setCurrency(e)
                            }

                            return (
                                <div className={styles.item} key={id} data-id={index}>

                                        <div className={styles.item__info}>
                                            <Link href={{ pathname: `/catalog/${slug}`, query: { currency: currency } }}>
                                                <div>
                                                    <div className={styles.catalog__main_image}>
                                                        <Image src={ image.mediaItemUrl } priority layout={"fill"}/>
                                                    </div>
                                                    <div className={styles.item__title}>
                                                        { name }
                                                    </div>
                                                    <div className={styles.item__property_type}>
                                                        { productCategories.edges?.map((category) => { if (category.node.parentDatabaseId === propertyTypeCategory) {return category.node.name}}) }
                                                    </div>
                                                    <div className={styles.item__country}>
                                                        <div className={styles.country__icon}>
                                                            <Image src={globus} />
                                                        </div>
                                                        <div className={styles.country}>
                                                            { productCategories.edges?.map((category) => { if (category.node.parentDatabaseId === countryCategory) {return category.node.name}})}
                                                        </div>
                                                    </div>
                                                    <div className={styles.item__attributes}>
                                                        <div className={`${styles.sqm} ${styles.item__attribute}`}>
                                                            <div className={styles.sqm__icon}>
                                                                <Image src={sqm} />
                                                            </div>
                                                            <div className={styles.sqm__value}>
                                                                { attributes.edges?.map((sqm) => { if (sqm.node.name === 'sqm') {return sqm.node.options[0]} }) } sqm
                                                            </div>
                                                        </div>
                                                        <div className={`${styles.bedrooms} ${styles.item__attribute}`}>
                                                            <div className={styles.bedrooms__value}>
                                                                { attributes.edges?.map((bedroom) => { if (bedroom.node.name === 'Bedrooms') {return bedroom.node.options[0]} }) }
                                                            </div>
                                                            <div className={styles.bedrooms__icon}>
                                                                { matches1440 ? 'Bedrooms' : <Image src={bedroom} />}
                                                            </div>
                                                        </div>
                                                        <div className={`${styles.bathrooms} ${styles.item__attribute}`}>
                                                            <div className={styles.bathrooms__value}>
                                                                { attributes.edges?.map((bathroom) => { if (bathroom.node.name === 'Bathrooms') {return bathroom.node.options[0]} }) }
                                                            </div>
                                                            <div className={styles.bathrooms__icon}>
                                                                { matches1440 ? 'Bathrooms' : <Image src={bathroom} />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            { attributes?.edges?.map((price, index) => {
                                                return price.node.name === 'Price' && <CurrentPrice price={[price.node.options[0]]} currency={handleCurrency} key={index}/>
                                            })}
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
                                                { galleryImages.edges?.map((slide, index) => {
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
                { matches || isMobileMenuFilterOpen ?
                    <div className={styles.sidebar}>
                        { !matches ? <div className={styles.sidebar__title}>Filters <div className={styles.sidebar__close} onClick={() => mobileMenuHandler()}>Close</div></div> : null }
                        <div className={styles.filter__wrap}>
                            {isCountryItemPicked ? <div className={styles.clear} onClick={() => clearCountry()}>
                                    Clear
                                </div>
                                :
                                null
                            }
                            <div>
                                <div
                                    className={isCountryItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar}
                                    onClick={() => countryList()}>
                                    <div
                                        className={isCountryItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                        country
                                    </div>
                                    <div className={isCountryListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                        {isCountryItemPicked ? <Image src={arrow__white}/> : <Image src={arrow__black}/>}
                                    </div>
                                </div>
                                {isCountryListOpen ?
                                    <div className={styles.filter__list}>
                                        {productCategories.edges?.map((category, index) => {
                                            if (category.node.parentDatabaseId === countryCategory) {
                                                return <div className={styles.filter__item} key={index}
                                                            onClick={() => handleCountryCheck(category.node.databaseId)}>
                                                    <div className={styles.filter__name}>
                                                        {category.node.name}
                                                    </div>
                                                    <div className={styles.filter__checkbox}>
                                                        {countriesId.map((id, index) => {
                                                            if (id === category.node.databaseId) {
                                                                return <div key={index}
                                                                            className={styles.filter__checkbox_checked}/>
                                                            }
                                                        })}
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
                            {isMinPriceItemPicked || isMaxPriceItemPicked ?
                                <div className={styles.clear} onClick={() => clearPrice()}>
                                    Clear
                                </div>
                                :
                                null
                            }
                            <div>
                                <div
                                    className={isMinPriceItemPicked || isMaxPriceItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar}
                                    onClick={() => priceList()}>
                                    <div
                                        className={isMinPriceItemPicked || isMaxPriceItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                        Price
                                    </div>
                                    <div className={isPriceListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                        {isMinPriceItemPicked || isMaxPriceItemPicked ? <Image src={arrow__white}/> :
                                            <Image src={arrow__black}/>}
                                    </div>
                                </div>
                                {isPriceListOpen ?
                                    <div className={styles.filter__list}>
                                        <div className={styles.currency}>USD</div>
                                        <div className={styles.filter__interval}>
                                            <div className={styles.number__input}>
                                                <input type="number" min="0" value={minPrice}
                                                       className={isMinPriceItemPicked ? `${styles.input__number_picked} ${styles.input__number}` : styles.input__number}
                                                       onChange={handleMinChange}/>
                                                <div className={styles.label}>
                                                    min
                                                </div>
                                            </div>
                                            <div className={styles.number__input}>
                                                <input type="number" min="0" value={maxPrice}
                                                       className={isMaxPriceItemPicked ? `${styles.input__number_picked} ${styles.input__number}` : styles.input__number}
                                                       onChange={handleMaxChange}/>
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
                            {isTypeItemPicked ? <div className={styles.clear} onClick={() => clearType()}>
                                    Clear
                                </div>
                                :
                                null
                            }
                            <div>
                                <div
                                    className={isTypeItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar}
                                    onClick={() => typeList()}>
                                    <div
                                        className={isTypeItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                        Property type
                                    </div>
                                    <div className={isTypeListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                        {isTypeItemPicked ? <Image src={arrow__white}/> : <Image src={arrow__black}/>}
                                    </div>
                                </div>
                                {isTypeListOpen ?
                                    <div className={styles.filter__list}>
                                        {productCategories.edges?.map((category, index) => {
                                            if (category.node.parentDatabaseId === propertyTypeCategory) {
                                                return <div className={styles.filter__item} key={index}
                                                            onClick={() => handleTypeCheck(category.node.databaseId)}>
                                                    <div className={styles.filter__name}>
                                                        {category.node.name}
                                                    </div>
                                                    <div className={styles.filter__checkbox}>
                                                        {typeId.map((id, index) => {
                                                            if (id === category.node.databaseId) {
                                                                return <div key={index}
                                                                            className={styles.filter__checkbox_checked}/>
                                                            }
                                                        })}
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
                            {isBedroomsItemPicked ? <div className={styles.clear} onClick={() => clearBedrooms()}>
                                    Clear
                                </div>
                                :
                                null
                            }
                            <div>
                                <div
                                    className={isBedroomsItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar}
                                    onClick={() => bedroomsList()}>
                                    <div
                                        className={isBedroomsItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                        Bedrooms
                                    </div>
                                    <div className={isBedroomsListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                        {isBedroomsItemPicked ? <Image src={arrow__white}/> : <Image src={arrow__black}/>}
                                    </div>
                                </div>
                                {isBedroomsListOpen ?
                                    <div className={styles.filter__list}>
                                        {bedroomsCount.map((i, index) => {
                                            return <div className={styles.filter__item} key={index}
                                                        onClick={() => handleBedroomsCheck(i)}>
                                                <div className={`${styles.filter__name} ${styles.filter__name_attribute}`}>
                                                    {i}
                                                </div>
                                                <div className={styles.filter__checkbox}>
                                                    {bedroomsSelected.map((id, index) => {
                                                        if (id === i && i !== '5') {

                                                            return <div key={index}
                                                                        className={styles.filter__checkbox_checked}/>
                                                        }
                                                        if (allBedroomsMore5(products).includes(id) && i === '5') {
                                                            return <div key={index}
                                                                        className={styles.filter__checkbox_checked}/>
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <div className={styles.filter__wrap}>
                            {isMinSqmItemPicked || isMaxSqmItemPicked ?
                                <div className={styles.clear} onClick={() => clearSqm()}>
                                    Clear
                                </div>
                                :
                                null
                            }
                            <div>
                                <div
                                    className={isMinSqmItemPicked || isMaxSqmItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar}
                                    onClick={() => sqmList()}>
                                    <div
                                        className={isMinSqmItemPicked || isMaxSqmItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                        square footage
                                    </div>
                                    <div className={isSqmListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                        {isMinSqmItemPicked || isMaxSqmItemPicked ? <Image src={arrow__white}/> :
                                            <Image src={arrow__black}/>}
                                    </div>
                                </div>
                                {isSqmListOpen ?
                                    <div className={styles.filter__list}>
                                        <div className={styles.filter__interval}>
                                            <div className={styles.number__input}>
                                                <input type="number" min="0" max="2000" value={minSqm}
                                                       className={isMinSqmItemPicked ? `${styles.input__number_picked} ${styles.input__number}` : styles.input__number}
                                                       onChange={handleMinSqmChange}/>
                                                <div className={styles.label}>
                                                    min
                                                </div>
                                            </div>
                                            <div className={styles.number__input}>
                                                <input type="number" min="0" max="2000" value={maxSqm}
                                                       className={isMaxSqmItemPicked ? `${styles.input__number_picked} ${styles.input__number}` : styles.input__number}
                                                       onChange={handleMaxSqmChange}/>
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
                            {isBathroomsItemPicked ? <div className={styles.clear} onClick={() => clearBathrooms()}>
                                    Clear
                                </div>
                                :
                                null
                            }
                            <div>
                                <div
                                    className={isBathroomsItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar}
                                    onClick={() => bathroomsList()}>
                                    <div
                                        className={isBathroomsItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                        Bathrooms
                                    </div>
                                    <div className={isBathroomsListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                        {isBathroomsItemPicked ? <Image src={arrow__white}/> : <Image src={arrow__black}/>}
                                    </div>
                                </div>
                                {isBathroomsListOpen ?
                                    <div className={styles.filter__list}>
                                        {bathroomsCount.map((i, index) => {
                                            return <div className={styles.filter__item} key={index}
                                                        onClick={() => handleBathroomsCheck(i)}>
                                                <div className={`${styles.filter__name} ${styles.filter__name_attribute}`}>
                                                    {i}
                                                </div>
                                                <div className={styles.filter__checkbox}>
                                                    {bathroomsSelected.map((id, index) => {
                                                        if (id === i && i !== '5') {

                                                            return <div key={index}
                                                                        className={styles.filter__checkbox_checked}/>
                                                        }
                                                        if (allBathroomsMore5(products).includes(id) && i === '5') {
                                                            return <div key={index}
                                                                        className={styles.filter__checkbox_checked}/>
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <div className={styles.filter__wrap}>
                            {isOutdoorItemPicked ? <div className={styles.clear} onClick={() => clearOutdoor()}>
                                    Clear
                                </div>
                                :
                                null
                            }
                            <div>
                                <div
                                    className={isOutdoorItemPicked ? `${styles.drop__bar_picked} ${styles.drop__bar}` : styles.drop__bar}
                                    onClick={() => outdoorList()}>
                                    <div
                                        className={isOutdoorItemPicked ? `${styles.filter__title_picked} ${styles.filter__title}` : styles.filter__title}>
                                        Additional
                                    </div>
                                    <div className={isOutdoorListOpen ? styles.filter__icon_open : styles.filter__icon}>
                                        {isOutdoorItemPicked ? <Image src={arrow__white}/> : <Image src={arrow__black}/>}
                                    </div>
                                </div>
                                {isOutdoorListOpen ?
                                    <div className={styles.filter__list}>
                                        {productCategories.edges?.map((category, index) => {
                                            if (category.node.parentDatabaseId === outdoorCategory) {
                                                return <div className={styles.filter__item} key={index}
                                                            onClick={() => handleOutdoorCheck(category.node.databaseId)}>
                                                    <div className={styles.filter__name}>
                                                        {category.node.name}
                                                    </div>
                                                    <div className={styles.filter__checkbox}>
                                                        {outdoorId.map((id, index) => {
                                                            if (id === category.node.databaseId) {
                                                                return <div key={index}
                                                                            className={styles.filter__checkbox_checked}/>
                                                            }
                                                        })}
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
                    :
                    null
                }
            </div>
        </>
    )

}