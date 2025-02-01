'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

import { CategoryFilterContext } from './CategoryFilter.context';

import { get_MainPageOfferts } from '@/api/offerts.api';

import { 
    admitsValidator,
    availabilityValidator,
    categoryValidator, 
    serviceFilterValidator,
    sortedValidator,
    areArraysEqual
} from '@/validations/filters.validation';

export const MainPageContext = createContext();

export const MainPageProvider = ({ children }) => {

    /**************************{ Declaraciones }**************************/

    const MAX_ITEMS_PER_PAGE = 9;


    const { filterObj } = useContext(CategoryFilterContext);

    const [offertsData, setOfertsData] = useState(null);

    const [filtredDataForCards, setFiltredDataForCards] = useState([]);
    const [renderedCards, setRenderedCards] = useState(filtredDataForCards.slice(0, MAX_ITEMS_PER_PAGE));
    const [searchTerm, setSearchTerm] = useState('');


    const totalPages = Math.ceil(filtredDataForCards.length / MAX_ITEMS_PER_PAGE);


    const [currentPage, setCurrentPage] = useState(totalPages - (totalPages - 1));

    const [fetchingOfferts, setFetchingOfferts] = useState(false);


    /**************************{ UseEfects }**************************/


    //Se actualizan las cartas a renderizar cada que se cambia de pagina
    useEffect(() => {
        paginationRederedCardHandeler();
    }, [currentPage, filtredDataForCards]);

    //Se renderiza la pagina cada que cambian los filtros
    useEffect(() => {
        offertsFilter();
    }, [filterObj, searchTerm, offertsData]);


    /**************************{ Funciones }**************************/


    /*                         { fetching de datos }                         */

    const fetchOfferts = async () => {
        try {
            setFetchingOfferts(true);

            const offerts = await get_MainPageOfferts();

            //Compara las ofertas existentes con las ofertas de la DB, de serlo no se realizan cambios
            if (areArraysEqual(offertsData, offerts)) {
                console.log("no update")
                setFetchingOfferts(false);
                return true;
            };

            setOfertsData(offerts);
            setFiltredDataForCards(offerts);
            setFetchingOfferts(false);
            return true;
        } catch (error) {
            setFetchingOfferts(false);
            console.error(error);
            return false;
        };
    };


    /*                         { Paginacion }                         */


    const pageChangeHandler = (action) => {
        if (action == 'first' && currentPage !== 1) {
            setCurrentPage(1);
        };

        if (action == 'previous' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        };

        if (action == 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        };

        if (action == 'last' && currentPage !== totalPages && totalPages !== 0) {
            setCurrentPage(totalPages);
        };
    };

    const paginationRederedCardHandeler = useCallback(() => {
        const startIndex = (currentPage - 1) * MAX_ITEMS_PER_PAGE;
        const endIndex = startIndex + MAX_ITEMS_PER_PAGE;

        setRenderedCards(filtredDataForCards.slice(startIndex, endIndex));
    }, [currentPage, filtredDataForCards]);


    /*                         { Filtros }                         */


    const offertsFilter = useCallback(() => {

        if (!offertsData) return;
    
        const filteredCards = offertsData.filter((card) => {

            //Filtros de Checkboxes
            const typeFilter = categoryValidator(filterObj, 'Tipo', card.type);

            const locationFilter = categoryValidator(filterObj, 'Ubicación', card.location);
            
            const servicesFilter = serviceFilterValidator(filterObj, card);

            const admitsFilter = admitsValidator(filterObj, card);

            const hiddenFilter = filterObj.showHidden ? true : !card.hidden;

            return (
                typeFilter &&
                locationFilter &&
                servicesFilter &&
                admitsFilter &&
                hiddenFilter &&
                availabilityValidator(filterObj, card)
            );
        });

        //Filtro de DropList
        const sortedFiltered = sortedValidator(filterObj, filteredCards);

        //Filtro de busqueda por nombre
        setFiltredDataForCards(sortedFiltered.filter(card =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase())
        ));

        //Se lleva a la pagina 1 al aplicar un filtro
        setCurrentPage(1);
    }, [offertsData, filterObj, searchTerm]);


    /*                         { Busqueda  }                         */


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const clearSearchInput = () => {
        setSearchTerm('');
    };


    /**************************{ Retorno }**************************/


    return (
        <MainPageContext.Provider
            value={{
                currentPage,
                totalPages,
                renderedCards,
                searchTerm,

                offertsData,

                fetchingOfferts,

                fetchOfferts,
                pageChangeHandler,
                handleSearchChange,
                clearSearchInput
            }}
        >
            {children}
        </MainPageContext.Provider>
    );
};