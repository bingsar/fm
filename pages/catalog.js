import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CatalogBlock from "../components/catalog/catalogBlock";
import useMediaQuery from "@mui/material/useMediaQuery";

import {gql} from "@apollo/client";
import {client} from "../lib/apollo";

export default function Catalog({ data }) {

    const matches = useMediaQuery("(min-width: 768px)")

    return (
        <div className="container__wrap">
            <Head>
                <title>F&M | Catalog</title>
                <link rel="icon" href="/logo_fm.svg"></link>
            </Head>
            <Header />
            <main>
                <section className="container">
                      <CatalogBlock filter={ data } />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export async function getStaticProps() {
    const GET_DATA = gql`
        query getData {
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
                  }
                }
            }
        }
    `

    const response = await client.query({
        query: GET_DATA
    })
    const data = response?.data
    return {
        props: {
            data
        }
    }
}