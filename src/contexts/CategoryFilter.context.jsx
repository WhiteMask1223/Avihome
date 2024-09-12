import { createContext, useState } from 'react';

const locationData = {
    'Urb. Rómulo Gallegos': false,
    'Barrio Texto que excede los limites': false,
    'Centro': false,
    'Las Palmas': false,
    'Terminal': false,
    'Las Abejitas': false,
    'Zona Industrial': false,
    'Urb. Los Jardines': false,
    'Urb. Los Morros': false,
    'Bario Las Mercedes': false,
    'Urb. Santa Isabel': false,
    'Urb. Los Laureles': false,
    'Barrio La Ceiba': false,
    'Barrio Puerta Negra': false,
    'Barrio Bicentenerio': false,
    'Barrio La Morera': false,
    'Barrio Pueblo Nuevo': false,
    'Urb. Los Naranjos': false
};


const sortedEntries = Object.entries(locationData).sort(([keyA], [keyB]) => {
    return keyA.localeCompare(keyB); 
});
  
const sortedLocationData = Object.fromEntries(sortedEntries);


const filterObjConstructor = {
    'Tipo': {
      'Anexo': false,
      'Casa': false,
      'Complejo Residencial': false,
      'Departamento': false,
      'Habitación': false
    },

    'Ubicación': sortedLocationData,

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

    showHidden: false,

    icons: {
        'Tipo': "ri-community-line", 
        'Ubicación': "ri-road-map-line",
        'Servicios': "ri-flashlight-line",
        'Disponibilidad': "ri-home-2-line",
        'Admite': "ri-group-line"
    }
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