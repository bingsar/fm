import Head from 'next/head';
import Header from "../components/Header";
import Hero from "../components/Hero";
import MainPagePosts from "../components/mainPage/MainPagePosts";
import Mission from "../components/mainPage/Mission";
import CatalogSlider from "../components/mainPage/CatalogSlider";

import { client } from "../lib/apollo";
import { gql } from "@apollo/client";
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
//
// export async function getStaticProps() {
//
//     const GET_POSTS = gql`
//         query getAllPosts {
//             posts {
//               nodes {
//               categories {
//                 nodes {
//                   name
//                 }
//               }
//               excerpt
//               title
//               featuredImage {
//                 node {
//                   mediaItemUrl
//                 }
//               }
//               id
//             }
//           }
//         }
//     `
//
//     const response = await  client.query({
//         query: GET_POSTS
//     })
//
//     const posts = response?.data?.posts?.nodes;
//     return {
//         props: {
//             posts
//         }
//     }
// }
