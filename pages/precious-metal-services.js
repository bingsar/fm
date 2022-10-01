import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CatalogSlider from "../components/mainPage/CatalogSlider";
import Labels from "../components/mainPage/Labels";
import MetalServicesBlock from "../components/metal-services/MetalServicesBlock";


export default function MetalServices() {

    return (
        <div className="container__wrap">
            <Head>
                <title>F&M | Precious Metal Services.</title>
                <link rel="icon" href="favicon.ico"></link>
            </Head>
            <Header />
            <main>
                <MetalServicesBlock />
                <Labels />
                <CatalogSlider />
            </main>
            <Footer />
        </div>
    )
}