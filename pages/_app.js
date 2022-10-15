import '../styles/index.css'
import { ApolloProvider } from "@apollo/client/react";
import { client } from "../lib/apollo";
import { AppWrapper } from "../src/store";
import { useState } from "react";

function MyApp({ Component, pageProps }) {



  const [ctxCountry, setCtxCountry] = useState([34]);
  const value = { ctxCountry, setCtxCountry };


  return (

          <ApolloProvider client={client}>
              <AppWrapper value={value}>
                <Component {...pageProps} />
              </AppWrapper>
          </ApolloProvider>

    )
}

export default MyApp