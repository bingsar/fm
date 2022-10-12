import '../styles/index.css'
import { ApolloProvider } from "@apollo/client/react";
import { client } from "../lib/apollo";
import { AppWrapper } from "../src/store";

function MyApp({ Component, pageProps }) {
  return (
      <AppWrapper>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
      </AppWrapper>
    )
}

export default MyApp