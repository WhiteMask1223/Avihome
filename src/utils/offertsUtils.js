export const filterObjTemplate = (offertType, locationData) => {
    return {
        'Tipo': offertType,

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
            'Dos a Cinco Habitaciones': false,
            'Cinco a Diez Habitaciones': false,
            'Más de Diez Habitaciones': false
        },

        'Admite': {
            'Caballeros': false,
            'Damas': false,
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
    }
};

export const phoneNumberFormater = (newValue) => {
    newValue = newValue.replace(/[^0-9]/g, "");

    if (newValue.length > 4) {
        newValue = newValue.slice(0, 4) + "-" + newValue.slice(4);
    };

    return newValue;
}