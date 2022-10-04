import Head from "next/head";
import Header from "../components/Header";
import AboutUsBlock from "../components/about-us/AboutUsBlock";
import Labels from "../components/mainPage/Labels";
import CatalogSlider from "../components/mainPage/CatalogSlider";
import Footer from "../components/Footer";

export default function AboutUs() {
    return (
        <div className="container__wrap">
            <Head>
                <title>F&M | About Us</title>
                <link rel="icon" href="/logo_fm.svg"></link>
            </Head>
            <Header />
            <main>
                <AboutUsBlock />
                <Labels />
                <CatalogSlider />
            </main>
            <Footer />
        </div>
    )
}