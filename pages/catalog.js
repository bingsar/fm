import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CatalogHero from "../components/catalog/catalogHero";
import CatalogBlock from "../components/catalog/catalogBlock";
// import FilterSidebar from "../components/catalog/filterSidebar";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from '/styles/catalog.module.css'
import {gql} from "@apollo/client";
import {client} from "../lib/apollo";

export default function Catalog({ data }) {

    const matches = useMediaQuery("(min-width: 768px)")

    return (
        <div className="container__wrap">
            <Head>
                <title>F&M | Catalog</title>
                <link rel="icon" href="/logo_fm.svg"></link>
            </Head>
            <Header />
            <main>
                <section className="container">
                    <CatalogHero />
                    <div className={styles.catalog__wrap}>
                      <CatalogBlock filter={ data } />
                        {/*{ matches ? <FilterSidebar data={ data } /> : null}*/}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export async function getStaticProps() {
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

    const response = await client.query({
        query: GET_DATA
    })
    const data = response?.data
    return {
        props: {
            data
        }
    }
}