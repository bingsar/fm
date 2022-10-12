import Head from 'next/head';
import Header from "../components/Header";
import Hero from "../components/Hero";
import MainPagePosts from "../components/mainPage/MainPagePosts";
import Mission from "../components/mainPage/Mission";
import CatalogSlider from "../components/mainPage/CatalogSlider";

import Labels from "../components/mainPage/Labels";
import Footer from "../components/Footer";
import {gql} from "@apollo/client";
import {client} from "../lib/apollo";


export default function Home({ images }) {
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
            <CatalogSlider data={ images }/>
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
    const images = response?.data

    return {
        props: {
            images
        }
    }
}
