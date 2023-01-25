import { createContext, useContext, useEffect, useState } from 'react';
import { gql, useQuery } from "@apollo/client";

const AppContext = createContext({
    stages: [],
    ctxCountry: [0],
    ctxLanguage: '',
    showAnimation: true,
    isClose: false,
    setCtxCountry: () => {},
    setCtxLanguage: () => {},
    setShowAnimation: () => {},
    setIsClose: () => {},
});

export function AppWrapper({ children }) {

    const [isClose, setIsClose] = useState(false)
    const [stages, setStages] = useState([]);
    const [ctxCountry, setCtxCountry] = useState([33])
    const [showAnimation, setShowAnimation] = useState(true)
    const [ctxLanguage, setCtxLanguage] = useState('EN')

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
        ctxLanguage,
        setCtxCountry,
        showAnimation,
        setShowAnimation,
        setIsClose,
        setCtxLanguage
    };

    return (
        <AppContext.Provider value={{state, ctxCountry, setCtxCountry, showAnimation, setShowAnimation, setIsClose, isClose, ctxLanguage, setCtxLanguage }} >
            {children}
        </AppContext.Provider>
    );
}

export default function useAppContext() {
    return useContext(AppContext);
}