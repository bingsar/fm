import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FamilyHero from "../components/family-office/FamilyHero";
import CatalogSlider from "../components/mainPage/CatalogSlider";
import FamilyList from "../components/family-office/FamilyList";
import Labels from "../components/mainPage/Labels";

export default function Family() {
    return (
        <div className="container__wrap">
            <Head>
                <title>F&M | Family Office</title>
                <link rel="icon" href="favicon.ico"></link>
            </Head>
            <Header />
            <main>
                <FamilyHero />
                <FamilyList />
                <Labels />
                <CatalogSlider />
            </main>
            <Footer />
        </div>
    )
}