import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CatalogSlider from "../components/mainPage/CatalogSlider";
import Labels from "../components/mainPage/Labels";
import InvestmentBlock from "../components/investment/investmentBlock";


export default function InvestmentManagment() {

    return (
        <div className="container__wrap">
            <Head>
                <title>F&M | Investment Managment</title>
                <link rel="icon" href="logo_fm.svg"></link>
            </Head>
            <Header />
            <main>
                <InvestmentBlock />
                <Labels />
                <CatalogSlider />
            </main>
            <Footer />
        </div>
    )
}