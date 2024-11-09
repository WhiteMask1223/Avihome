'use client'

import { createContext, useState, useEffect } from 'react';

import { get_OffertsLocationAndType } from '@/api/offerts.api';

import { filterObjTemplate } from '@/utils/offertsUtils';


export const CategoryFilterContext = createContext();

export const CategoryFilterProvider = ({ children }) => {


    /**************************{ Declaraciones }**************************/

    const [offertsType, setOffertsType] = useState({});
    const [offertsLocation, setOffertsLocation] = useState({});

    const [filterObj, setFilterObj] = useState(filterObjTemplate(offertsType, offertsLocation));

    const locationAndTypeFetch = async () => {
        const data = await get_OffertsLocationAndType();

        setOffertsType(data.offertType);
        setOffertsLocation(data.sortedLocationData);

        setFilterObj(filterObjTemplate(data.offertType, data.sortedLocationData));
    };


    /**************************{ useEffects }**************************/

    useEffect(() => {
        if (
            Object.keys(offertsType).length === 0 ||
            Object.keys(offertsLocation).length === 0
        ) {
            try {
                locationAndTypeFetch()
            } catch (error) {
                console.error(error);
            }
        };
    });

    
    /**************************{ Funciones }**************************/


    const handleCheckboxChange = (category, categoryItem, newValue) => {
        setFilterObj((prevFilterObj) => ({
            ...prevFilterObj,
            [category]: {
                ...prevFilterObj[category],
                [categoryItem]: newValue
            }
        }));

        //TODO:DELETE ME
        /*setFilterObj(prevFilterObj => {

            let newState = { ...prevFilterObj };
            let current = newState;
        
            for (let i = 0; i < path.length - 1; i++) {
            current[path[i]] = { ...current[path[i]] };
            current = current[path[i]];
            }
    
            current[path[path.length - 1]] = newValue;
        
            return newState;
        });*/
    };

    const sortAndHiddenHandler = (objKey, newValue) => {
        setFilterObj((prevFilterObj) => ({
            ...prevFilterObj,
            [objKey]: newValue
        }));
    }

    const resetFilters = () => {
        setFilterObj(filterObjTemplate(offertsType, offertsLocation));
    };


    /**************************{ Retorno }**************************/


    return (
        <CategoryFilterContext.Provider
            value={{
                filterObj,
                offertsType,
                offertsLocation,

                handleCheckboxChange,
                sortAndHiddenHandler,
                resetFilters
            }}
        >
            {children}
        </CategoryFilterContext.Provider>
    );
};