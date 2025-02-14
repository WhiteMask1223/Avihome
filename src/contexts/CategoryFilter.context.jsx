'use client'

import { createContext, useState, useEffect } from 'react';

import { get_OffertsLocationAndType } from '@/api/locationsAndTypes.api';

import { filterObjTemplate } from '@/utils/offertsUtils';


export const CategoryFilterContext = createContext();

export const CategoryFilterProvider = ({ children }) => {


    /**************************{ Declaraciones }**************************/

    const [offertsType, setOffertsType] = useState(null);
    const [offertsLocation, setOffertsLocation] = useState(null);

    const [rawType, setRawType] = useState([]);
    const [rawLocation, setRawLocation] = useState([]);

    const [filterObj, setFilterObj] = useState(null);

    const locationAndTypeFetch = async () => {
        try {
            const data = await get_OffertsLocationAndType();

            if (!data.length) {}

            setOffertsLocation(dbArrayToObject(data.locations));
            setOffertsType(dbArrayToObject(data.types));

            setRawType(data.types);
            setRawLocation(data.locations);

            setFilterObj(filterObjTemplate(dbArrayToObject(data.types), dbArrayToObject(data.locations)));
        } catch (error) {
            console.error("locationAndTypeFetch error: ", error)
        }
    };

    const dbArrayToObject = (initialArray) => {
        let transformedObject = {};

        initialArray.forEach(item => {
            transformedObject[item.text] = false;
        });

        return transformedObject;
    };


    /**************************{ useEffects }**************************/

    useEffect(() => {
        if (
            !offertsLocation || !offertsType
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

                rawType,
                rawLocation,

                locationAndTypeFetch,
                handleCheckboxChange,
                sortAndHiddenHandler,
                resetFilters
            }}
        >
            {children}
        </CategoryFilterContext.Provider>
    );
};