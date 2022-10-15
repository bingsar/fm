import {createContext, useContext, useEffect, useState} from 'react';
import {gql, useQuery} from "@apollo/client";

const AppContext = createContext({
    stages: [],
    ctxCountry: [0],
    setCtxCountry: () => {},
    rgbDataURL: () => {}
});

export function AppWrapper({ children }) {

    const [stages, setStages] = useState([]);
    const [ctxCountry, setCtxCountry] = useState([34])

    const keyStr =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

    const triplet = (e1, e2, e3) =>
        keyStr.charAt(e1 >> 2) +
        keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
        keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
        keyStr.charAt(e3 & 63)

    const rgbDataURL = (r, g, b) =>
        `data:image/gif;base64,R0lGODlhAQABAPAA${
            triplet(0, r, g) + triplet(b, 255, 255)
        }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

    const GET_COUNTRY = gql`
        query getCountry {
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

    const { data, loading, error } = useQuery(GET_COUNTRY);

    if (error) {
        console.log(error)
    }
    if (!data && loading) {
        console.log('loading...')
    }

    useEffect(() => {
        data !== undefined ? setStages(data) : null
    })

    const state = {
        stages,
        ctxCountry,
        setCtxCountry,
        rgbDataURL
    };

    return (
        <AppContext.Provider value={{state, ctxCountry, setCtxCountry, rgbDataURL}} >
            {children}
        </AppContext.Provider>
    );
}

export default function useAppContext() {
    return useContext(AppContext);
}