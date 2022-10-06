import Head from 'next/head';
import Header from "../components/Header";
import Hero from "../components/Hero";
import MainPagePosts from "../components/mainPage/MainPagePosts";
import Mission from "../components/mainPage/Mission";
import CatalogSlider from "../components/mainPage/CatalogSlider";

import Labels from "../components/mainPage/Labels";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <div className="container__wrap">
      <Head>
        <title>F&M | Real Estate</title>
        <link rel="icon" href="logo_fm.svg"></link>
      </Head>
        <Header />
        <main>
            <Hero />
            <MainPagePosts />
            <Mission />
            <Labels />
            <CatalogSlider />
        </main>
        <Footer />
    </div>
  )
}
