import Head from "next/head";
import Header from "../components/Header";
import AboutUsBlock from "../components/about-us/AboutUsBlock";

import CatalogSlider from "../components/mainPage/CatalogSlider";
import Footer from "../components/Footer";
import {gql} from "@apollo/client";
import {client} from "../lib/apollo";

export default function AboutUs({ images }) {
    return (
        <div className="container__wrap">
            <Head>
                <title>Minkh Capital | About Us</title>
                <link rel="icon" href="/logo_fm.svg"></link>
            </Head>
            <Header />
            <main>
                <AboutUsBlock />
                <CatalogSlider data={ images } />
            </main>
            <Footer />
        </div>
    )
}


export async function getStaticProps() {
    const GET_IMAGES = gql`
        query getImages {
            productCategories(first: 100) {
                edges {
                  node {
                    parentDatabaseId
                    name
                    databaseId
                  }
                }
            }
            products(first: 100) {
                edges {
                  node {
                    attributes {
                      edges {
                        node {
                          attributeId
                          name
                          options
                        }
                      }
                    }
                    productCategories(first: 100) {
                        edges {
                          node {
                            parentDatabaseId
                            name
                            databaseId
                          }
                        }
                    }
                    image {
                      mediaItemUrl
                    }
                  }
                }
            }
        }
    `
    const response = await client.query({
        query: GET_IMAGES
    })

    let images

    response?.data !== undefined ? images = response?.data : null

    return {
        props: {
            images
        }
    }
}