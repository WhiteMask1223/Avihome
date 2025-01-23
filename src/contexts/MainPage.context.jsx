'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

import { CategoryFilterContext } from './CategoryFilter.context';

import { get_MainPageOfferts } from '@/api/offerts.api';

export const MainPageContext = createContext();

export const MainPageProvider = ({ children }) => {

    /**************************{ Declaraciones }**************************/

    const MAX_ITEMS_PER_PAGE = 15;


    const { filterObj } = useContext(CategoryFilterContext);

    const [offertsData, setOfertsData] = useState(null)
    const [offertsFetched, setOffertsFetched] = useState(false)

    const [filtredDataForCards, setFiltredDataForCards] = useState([]);
    const [renderedCards, setRenderedCards] = useState(filtredDataForCards.slice(0, MAX_ITEMS_PER_PAGE));
    const [searchTerm, setSearchTerm] = useState('');


    const totalPages = Math.ceil(filtredDataForCards.length / MAX_ITEMS_PER_PAGE);


    const [currentPage, setCurrentPage] = useState(totalPages - (totalPages - 1));


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

    
    function areArraysEqual(arr1, arr2) {

        if ( !arr1 || arr1.length !== arr2.length) return false;
 
        const serialize = (obj) => JSON.stringify(obj);

        const set1 = new Set(arr1.map(serialize));
        
        for (const obj of arr2) {
            if (!set1.has(serialize(obj))) {
                return false; 
            };
        };

        return true;
    };

    const fetchOfferts = async () => {
        try {
            setOffertsFetched(true);

            const offerts = await get_MainPageOfferts();

            console.log("FetchOfferts", offerts);

            //Compara las ofertas existentes con las ofertas de la DB, de serlo no se realizan cambios
            if (areArraysEqual(offertsData, offerts)) {
                console.log("no update")
                return true;
            };

            setOfertsData(offerts);
            setFiltredDataForCards(offerts);
            return true;

        } catch (error) {
            setOffertsFetched(false);
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

        if (!offertsData) {
            return
        }

        const filteredCards = offertsData.filter((card) => {

            //Funcion para leer filtros
            const filterReader = (category, cardData) => {

                //En base al tipo/ubicacion/etc, de la carta, se busca su valor en el filterObj y se devuelve
                if (Object.values(filterObj[category]).some((value) => value === true)) {
                    return filterObj[category][cardData];
                };

                //En caso de que todos los valores de filterObj sean False, se devuelve true para que todas las cartas se muestren
                return true
            };

            const typeFilter = filterReader('Tipo', card.type);

            const locationFilter = filterReader('Ubicación', card.location);

            //Funcion para filtro de servicios
            const servicesFilter = Object.entries(filterObj['Servicios']).every(

                //Excluye las cartas donde el servicio seleccionado sea false
                ([service, isSelected]) => !isSelected || card.services[service]
            );

            //Filtro de disponibilidad
            const availabilityFilter = (() => {

                //Se guardan valores booleanos en base a la disponibilidad de la carta
                const roomFilters = {
                    'Una Habitación': card.availability.roomsAvailable === 1,
                    'Dos a Cinco Hablitaciones': card.availability.roomsAvailable >= 2 && card.availability.roomsAvailable <= 5,
                    'Cinco a Diez Habitaciones': card.availability.roomsAvailable >= 6 && card.availability.roomsAvailable <= 10,
                    'Más de Diez Habitaciones': card.availability.roomsAvailable > 10,
                };

                if (Object.values(filterObj['Disponibilidad']).some((value) => value === true)) {
                    return Object.entries(filterObj['Disponibilidad']).some(
                        ([key, isSelected]) => isSelected && roomFilters[key]
                    );
                };
                return true
            });

            const admitsFilter = Object.entries(filterObj['Admite']).every(

                //Excluye las cartas donde admits seleccionado sea false
                ([key, isSelected]) => !isSelected || card.admits[key]
            );

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
                    return b.availability.roomsAvailable - a.availability.roomsAvailable;
                case 'lowerAvailability':
                    return a.availability.roomsAvailable - b.availability.roomsAvailable;
                case 'latest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'older':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                default:
                    return b.rating - a.rating;
            };
        });

        //Filtro de busqueda por nombre
        setFiltredDataForCards(sortedFiltered.filter(card =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase())
        ));

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