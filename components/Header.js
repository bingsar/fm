import Navigation from "./Navigation";
import AddPropertyBar from "./AddPropertyBar";
import {gql} from "@apollo/client";
import {client} from "../lib/apollo";

export default function Header({ country }) {
    return (
        <>
            <header>
                <Navigation country={ country } />
                <AddPropertyBar />
            </header>
        </>
    )
}

export async function getStaticProps() {

    const GET_COUNTRY = gql`
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
        }
    `

    const response = await client.query({
        query: GET_COUNTRY
    })
    const country = response?.data

    return {
        props: {
            country
        }
    }
}