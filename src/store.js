import { createContext, useContext, useState } from 'react';

const AppContext = createContext({
    country: '',
    setCountry: (id) => {}
});

export function AppWrapper({ children }) {

    const [navCountryId, setNavCountryId] = useState('')

    function setCountryHandler(id) {
        setNavCountryId(id)
    }

    let context = {
        country: navCountryId,
        setCountry: setCountryHandler
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContext