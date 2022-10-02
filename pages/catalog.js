import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CatalogHero from "../components/catalog/catalogHero";
import CatalogBlock from "../components/catalog/catalogBlock";
import FilterSidebar from "../components/catalog/filterSidebar";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from '/styles/catalog.module.css'

export default function Catalog() {

    const matches = useMediaQuery("(min-width: 768px)")

    return (
        <div className="container__wrap">
            <Head>
                <title>F&M | Catalog</title>
                <link rel="icon" href="logo_fm.svg"></link>
            </Head>
            <Header />
            <main>
                <section className="container">
                    <CatalogHero />
                    <div className={styles.catalog__wrap}>
                      <CatalogBlock />
                        { matches ? <FilterSidebar /> : null}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}