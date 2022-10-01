import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CatalogBlock from "../components/catalog/catalogBlock";
import { client } from "../lib/apollo";
import { gql } from "@apollo/client";


export default function Catalog({ posts }) {
    return (
        <div className="container__wrap">
            <Head>
                <title>F&M | Catalog</title>
                <link rel="icon" href="logo_fm.svg"></link>
            </Head>
            <Header />
            <main>
                {
                    posts.map((post) => {
                        return (
                            <CatalogBlock post={post}/>
                        )
                    })
                }

            </main>
            <Footer />
        </div>
    )
}

export async function getStaticProps() {

    const GET_POSTS = gql`
    
        query getAllPosts {
          posts {
            nodes {
              categories {
                nodes {
                  name
                }
              }
              excerpt
              title
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              id
            }
          }
        }
    `

    const response = await client.query({
        query: GET_POSTS
    })

    const posts = response?.data?.posts?.nodes

    return {
        props: {
            posts
        }
    }

}