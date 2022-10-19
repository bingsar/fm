import {createContext, useContext, useEffect, useState} from 'react';
import {gql, useQuery} from "@apollo/client";

const AppContext = createContext({
    stages: [],
    ctxCountry: [0],
    showAnimation: true,
    isClose: false,
    setCtxCountry: () => {},
    setShowAnimation: () => {},
    setIsClose: () => {},
});

export function AppWrapper({ children }) {

    const [isClose, setIsClose] = useState(false)
    const [stages, setStages] = useState([]);
    const [ctxCountry, setCtxCountry] = useState([34])
    const [showAnimation, setShowAnimation] = useState(true)

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
        isClose,
        setCtxCountry,
        showAnimation,
        setShowAnimation,
        setIsClose,
    };

    return (
        <AppContext.Provider value={{state, ctxCountry, setCtxCountry, showAnimation, setShowAnimation, setIsClose, isClose }} >
            {children}
        </AppContext.Provider>
    );
}

export default function useAppContext() {
    return useContext(AppContext);
}