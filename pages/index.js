import Head from 'next/head';
import Header from "../components/Header";
import Hero from "../components/Hero";
import MainPagePosts from "../components/mainPage/MainPagePosts";
import Mission from "../components/mainPage/Mission";
import Catalog__Slider from "../components/mainPage/Catalog__Slider";

import { client } from "../lib/apollo";
import { gql } from "@apollo/client";
import Labels from "../components/mainPage/Labels";
import Footer from "../components/Footer";



export default function Home({ posts }) {
  return (
    <div className="container__wrap">
      <Head>
        <title>F&M</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>
        <Header />
        <main className="main">
            <Hero />
            <MainPagePosts />
            <Mission />
            <Labels />
            <Catalog__Slider />
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
