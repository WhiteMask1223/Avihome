import { createContext, useState } from 'react';

const locationData = {
    item1: {data:'Urb. Rómulo Gallegos', value:true},
    item2: {data:'Barrio Texto que excede los limites', value:true},
    item3: {data:'Centro', value:true},
    item4: {data:'Las Palmas', value:true},
    item5: {data:'Terminal', value:true},
};

const filterObjConstructor = {
    'Tipo': {
      anexo: {data:'Anexo', value:true},
      casa: {data:'Casa', value:true},
      complejoResidencial: {data:'Complejo Residencial', value:true},
      departamento: {data:'Departamento', value:true},
      habitacion: {data:'Habitacion', value:true}
    },

    'Ubicación': locationData,

    'Servicios': {
        agua: {data:'Agua', value:true},
        aireAcondicionado: {data:'Aire Acondicionado', value:true},
        electricidad: {data:'Electricidad', value:true},
        gas: {data:'Gas', value:true},
        internet: {data:'Internet', value:true}
    },

    'Número de Habitaciones': {
        Una: {data:'Una Habitación', value:true},
        DosACinco: {data:'Dos a Cinco Hablitaciones', value:true},
        CincoADiez: {data:'Cinco a Diez Habitaciones', value:true},
        MasDeDiez: {data:'Más de Diez Habitaciones', value:true}
    },

    'Admite': {
        hombres: {data:'Hombres', value:false},
        mujeres: {data:'Mujeres', value:false},
        cualquiera: {data:'Cualquiera', value:true}
    }
};


export const CategoryFilterContext = createContext();

export const CategoryFilterProvider = ({children}) => {

    const [filterObj, setFilterObj] = useState(filterObjConstructor);
    const [sortBy, setSortBy] = useState('bestRated');
    const [showHidden, setShowHidden] = useState(false);
    
    const handleCheckboxChange = (category, categoryItem, newValue) => {
        setFilterObj((prevFilterObj) => ({
            ...prevFilterObj,
            [category]:{
                ...prevFilterObj[category],
                [categoryItem]: {
                    ...prevFilterObj[category][categoryItem],
                    value: newValue
                }
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

    const resetFilters = () => {
        setSortBy('mejorPuntuados');
        setShowHidden(false);
        setFilterObj(filterObjConstructor);
    };

    return (
        <CategoryFilterContext.Provider
            value={{
                filterObj,
                sortBy,
                showHidden,

                setSortBy,
                setShowHidden,
                handleCheckboxChange,
                resetFilters   
            }}
        >
            {children}
        </CategoryFilterContext.Provider>
    );
};