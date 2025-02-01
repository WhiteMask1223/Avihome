export const categoryValidator = (filterObj, category, cardData) => {

    //En base al tipo/ubicacion/etc, de la carta, se busca su valor en el filterObj y se devuelve
    if (Object.values(filterObj[category]).some((value) => value === true)) {
        return filterObj[category][cardData];
    };

    //En caso de que todos los valores de filterObj sean False, se devuelve true para que todas las cartas se muestren
    return true
};

//Funcion para filtro de servicios
export const serviceFilterValidator = (filterObj, card) => {
    return Object.entries(filterObj['Servicios']).every(
        //Excluye las cartas donde el servicio seleccionado sea false
        ([service, isSelected]) => !isSelected || card.services[service]
    );
};

//Filtro de disponibilidad
export const availabilityValidator = (filterObj, card) => {

    //Se guardan valores booleanos en base a la disponibilidad de la carta
    const roomFilters = {
        'Una Habitación': card.availability.roomsAvailable === 1,
        'Dos a Cinco Habitaciones': card.availability.roomsAvailable >= 2 && card.availability.roomsAvailable <= 5,
        'Cinco a Diez Habitaciones': card.availability.roomsAvailable >= 6 && card.availability.roomsAvailable <= 10,
        'Más de Diez Habitaciones': card.availability.roomsAvailable > 10,
    };

    if (Object.values(filterObj['Disponibilidad']).some((value) => value === true)) {
        return Object.entries(filterObj['Disponibilidad']).some(
            ([key, isSelected]) => isSelected && roomFilters[key]
        );
    };

    return true
};
 

export const admitsValidator = (filterObj, card) => {
    return Object.entries(filterObj['Admite']).every(
        //Excluye las cartas donde admits seleccionado sea false
        ([key, isSelected]) => !isSelected || card.admits[key]
    );
};


export const sortedValidator = (filterObj, filteredCards) => {
    return [...filteredCards].sort((a, b) => {
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
};


export const areArraysEqual = (arr1, arr2) => {

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