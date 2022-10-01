import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CatalogSlider from "../components/mainPage/CatalogSlider";
import Labels from "../components/mainPage/Labels";
import RealEstateBlock from "../components/real-estate-investment/RealEstateBlock";


export default function InvestmentManagment() {

    return (
        <div className="container__wrap">
            <Head>
                <title>F&M | Real Estate Investment</title>
                <link rel="icon" href="logo_fm.svg"></link>
            </Head>
            <Header />
            <main>
                <RealEstateBlock />
                <Labels />
                <CatalogSlider />
            </main>
            <Footer />
        </div>
    )
}