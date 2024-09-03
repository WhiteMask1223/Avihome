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

            const filterReader = (category, cardData) => {
                if(Object.values(filterObj[category]).some((value) => value === true)) {
                    return filterObj[category][cardData];
                }
                
                return true
            };

            const typeFilter = filterReader('Tipo', card.type);

            const locationFilter = filterReader('Ubicación', card.location)

            const servicesFilter = Object.entries(filterObj['Servicios']).every(
                ([service, isSelected]) => !isSelected || card.services[service]
            );

            const availabilityFilter = (() => {
                const roomFilters = {
                  'Una Habitación': card.availability === 1,
                  'Dos a Cinco Hablitaciones': card.availability >= 2 && card.availability <= 5,
                  'Cinco a Diez Habitaciones': card.availability >= 6 && card.availability <= 10,
                  'Más de Diez Habitaciones': card.availability > 10,
                };

                if(Object.values(filterObj['Disponibilidad']).some((value) => value === true)) {
                    return Object.entries(filterObj['Disponibilidad']).some(
                        ([key, isSelected]) => isSelected && roomFilters[key]
                    );
                };   
                return true
            });

            const admitsFilter = filterReader('Admite', card.admits);

            const hiddenFilter = filterObj.showHidden ? true : !card.hidden;

            return (
                typeFilter &&
                locationFilter &&
                servicesFilter &&
                admitsFilter &&
                hiddenFilter &&
                availabilityFilter()
            );
           
        });

        const sortedFiltered = [...filteredCards].sort((a, b) => {
            switch (filterObj.sortBy) {
                case 'bestRated':
                    return b.rating - a.rating;
                case 'worstRated':
                    return a.rating - b.rating;
                case 'higherAvailability':
                    return b.availability - a.availability;
                case 'lowerAvailability':
                    return a.availability - b.availability;

                //TODO: orden por fechas
                case 'latest':
                    return b.rating - a.rating;
                case 'older':
                    return b.rating - a.rating;
                default:
                    return b.rating - a.rating;
            };
        });

        setFiltredDataForCards(sortedFiltered);
        setCurrentPage(1);
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