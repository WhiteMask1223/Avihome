import { createContext, useContext, useState, useEffect } from 'react';

import { CategoryFilterContext } from './CategoryFilter.context';
import { offertsData } from './offertsCardsObj';

export const MainPagePaginationContext = createContext();

export const MainPagePaginationProvider = ({children}) => {

    /**************************{ Declaraciones }**************************/

    const MAX_ITEMS_PER_PAGE = 15;


    const {filterObj} = useContext(CategoryFilterContext);
 

    const [currentPage, setCurrentPage] = useState(1);
    const [filtredDataForCards, setFiltredDataForCards] = useState(offertsData);
    const [renderedCards, setRenderedCards] = useState(filtredDataForCards.slice(0, MAX_ITEMS_PER_PAGE));

    const totalPages = Math.ceil(filtredDataForCards.length / MAX_ITEMS_PER_PAGE);



    /**************************{ UseEfects }**************************/


    //Se actualizan las cartas a renderizar cada que se cambia de pagina
    useEffect(() => {
        paginationRederedCardHandeler();
    }, [currentPage, filtredDataForCards]);

    useEffect(() => {
        offertsFilter()
    }, [filterObj])


    /**************************{ Funciones }**************************/



    /*                         { Paginacion }                         */

    const pageChangeHandler = (action) => {

        if(action == 'first' && currentPage !== 1) {
            setCurrentPage(1);
        };

        if(action == 'previous' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        };

        if (action == 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        };

        if(action == 'last' && currentPage !== totalPages) {
            setCurrentPage(totalPages);
        };
        
    };

    const paginationRederedCardHandeler = () => {
        const startIndex = (currentPage - 1) * MAX_ITEMS_PER_PAGE;
        const endIndex = startIndex + MAX_ITEMS_PER_PAGE;

        setRenderedCards(filtredDataForCards.slice(startIndex, endIndex));
    };


    /*                         { Filtros }                         */


    const offertsFilter = () => {
        const filteredCards = offertsData.filter((card) => {
            
            const typeFilter = filterObj['Tipo'][card.type];

            const locationFilter = filterObj['Ubicación'][card.location]

            const servicesFilter = Object.entries(filterObj['Servicios']).every(
                ([service, isSelected]) => !isSelected || card.services[service]
            );

            const roomsFilter = (() => {
                const roomFilters = {
                  'Una Habitación': card.rooms === 1,
                  'Dos a Cinco Hablitaciones': card.rooms >= 2 && card.rooms <= 5,
                  'Cinco a Diez Habitaciones': card.rooms >= 6 && card.rooms <= 10,
                  'Más de Diez Habitaciones': card.rooms > 10,
                };
              
                return Object.entries(filterObj['Número de Habitaciones']).some(
                  ([key, isSelected]) => isSelected && roomFilters[key]
                );
            });

            const admitsFilter = filterObj.Admite[card.admits];

            const hiddenFilter = filterObj.showHidden ? true : !card.hidden;

            return (
                typeFilter &&
                locationFilter &&
                servicesFilter &&
                admitsFilter &&
                hiddenFilter &&
                roomsFilter()
                
            );
           
        })

        setFiltredDataForCards(filteredCards)
        setCurrentPage(1)
    };

    
      


    /**************************{ Retorno }**************************/


    return(
        <MainPagePaginationContext.Provider
            value={{
                currentPage,
                totalPages,
                renderedCards,

                pageChangeHandler
            }}
        >
            {children}
        </MainPagePaginationContext.Provider>
    )

};