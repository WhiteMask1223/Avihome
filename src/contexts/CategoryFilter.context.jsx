import { createContext, useState } from 'react';

const locationData = {
    'Urb. Rómulo Gallegos': false,
    'Barrio Texto que excede los limites': false,
    'Centro': false,
    'Las Palmas': false,
    'Terminal': false,
};

const filterObjConstructor = {
    'Tipo': {
      'Anexo': false,
      'Casa': false,
      'Complejo Residencial': false,
      'Departamento': false,
      'Habitacion': false
    },

    'Ubicación': locationData,

    'Servicios': {
        'Agua': false,
        'Aire Acondicionado': false,
        'Electricidad': false,
        'Gas': false,
        'Internet': false
    },

    'Disponibilidad': {
        'Una Habitación': false,
        'Dos a Cinco Hablitaciones': false,
        'Cinco a Diez Habitaciones': false,
        'Más de Diez Habitaciones': false
    },

    'Admite': {
        'Solo Hombres': false,
        'Solo Mujeres': false,
        'Cualquiera': false
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