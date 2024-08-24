import { createContext, useState } from 'react';

export const MainPagePaginationContext = createContext();

export const MainPagePaginationProvider = ({children}) => {

    const [page, setPage] = useState(1);

    const totalPages = 10;

    const pageChangeHandler = (action) => {
        console.log("page change")

        if(action == 'first' && page !== 1) {
            setPage(1);
        };

        if(action == 'previous' && page > 1) {
            setPage(page - 1);
        };

        if (action == 'next' && page < totalPages) {
            setPage(page + 1);
        };

        if(action == 'last' && page !== totalPages) {
            setPage(totalPages);
        };
    };

    return(
        <MainPagePaginationContext.Provider
            value={{
                page,
                totalPages,

                pageChangeHandler
            }}
        >
            {children}
        </MainPagePaginationContext.Provider>
    )

};