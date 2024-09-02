import { createContext, useState } from 'react';

const locationData = {
    'Urb. Rómulo Gallegos': true,
    'Barrio Texto que excede los limites': true,
    'Centro': true,
    'Las Palmas': true,
    'Terminal': true,
};

const filterObjConstructor = {
    'Tipo': {
      'Anexo': true,
      'Casa': true,
      'Complejo Residencial': true,
      'Departamento': true,
      'Habitacion': true
    },

    'Ubicación': locationData,

    'Servicios': {
        'Agua': false,
        'Aire Acondicionado': false,
        'Electricidad': false,
        'Gas': false,
        'Internet': false
    },

    'Número de Habitaciones': {
        'Una Habitación': true,
        'Dos a Cinco Hablitaciones': true,
        'Cinco a Diez Habitaciones': true,
        'Más de Diez Habitaciones': true
    },

    'Admite': {
        'Solo Hombres': true,
        'Solo Mujeres': true,
        'Cualquiera': true
    },

    sortBy: "bestRated",

    showHidden: false

};


export const CategoryFilterContext = createContext();

export const CategoryFilterProvider = ({children}) => {


    /**************************{ Declaraciones }**************************/


    const [filterObj, setFilterObj] = useState(filterObjConstructor);
    

    /**************************{ Funciones }**************************/


    const handleCheckboxChange = (category, categoryItem, newValue) => {
        setFilterObj((prevFilterObj) => ({
            ...prevFilterObj,
            [category]:{
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
        setFilterObj(filterObjConstructor);
    };


    /**************************{ Retorno }**************************/


    return (
        <CategoryFilterContext.Provider
            value={{
                filterObj,

                handleCheckboxChange,
                sortAndHiddenHandler,
                resetFilters   
            }}
        >
            {children}
        </CategoryFilterContext.Provider>
    );
};