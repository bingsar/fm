// Add Apollo Client to this file
import { ApolloClient, InMemoryCache } from "@apollo/client";
import {relayStylePagination} from "@apollo/client/utilities";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                products: relayStylePagination(),
            },
        },
    },
})

export const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
    cache,
})