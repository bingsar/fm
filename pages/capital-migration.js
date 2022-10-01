import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CatalogSlider from "../components/mainPage/CatalogSlider";
import Labels from "../components/mainPage/Labels";
import CapitalBlock from "../components/capital/CapitalBlock"


export default function CapitalMigration() {

    return (
        <div className="container__wrap">
            <Head>
                <title>F&M | Capital Migration</title>
                <link rel="icon" href="logo_fm.svg"></link>
            </Head>
            <Header />
            <main>
                <CapitalBlock />
                <Labels />
                <CatalogSlider />
            </main>
            <Footer />
        </div>
    )
}