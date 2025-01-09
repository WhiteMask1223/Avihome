export const offertType = {
    'Anexo': false,
    'Casa': false,
    'Complejo Residencial': false,
    'Departamento': false,
    'Estudio': false,
    'Habitación': false
};


const locationData = {
    'Urb. Rómulo Gallegos': false,
    'Centro': false,
    'Las Palmas': false,
    'Terminal': false,
    'Urb. Las Abejitas': false,
    'Zona Industrial': false,
    'Urb. Los Jardines': false,
    'Urb. Los Morros': false,
    'Comunidad Las Mercedes': false,
    'Urb. Santa Isabel': false,
    'Urb. Los Laureles': false,
    'Comunidad La Ceiba': false,
    'Comunidad Puerta Negra': false,
    'Comunidad Bicentenerio': false,
    'Comunidad La Morera': false,
    'Comunidad Pueblo Nuevo': false,
    'Urb. Los Naranjos': false,
    'Urb. Altos de Fénix': false,
    'Urb. Antonio Miguel Martínez': false,
    'Comunidad Lucianro': false,
    'Urb. Hugo Chavez': false,
    'Urb. Acosta Carle': false,
    'Urb. La Tropical': false,
    'Urb. El Guafal': false,
};

const sortedEntries = Object.entries(locationData).sort(([keyA], [keyB]) => {
    return keyA.localeCompare(keyB);
});

export const sortedLocationData = Object.fromEntries(sortedEntries);


export const filterObjTemplate = ( offertType, locationData ) => {
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




/**************************{ Creador de Ofertas }**************************/


// Objeto con la información que puede variar

const filterOptions = {
    'Tipo': {
        'Anexo': false,
        'Casa': false,
        'Complejo Residencial': false,
        'Departamento': false,
        'Habitación': false
    },
    'Ubicación': {
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
    },
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
        'Solo Hombres': false,
        'Solo Mujeres': false,
        'Cualquiera': false
    }
};



// Función para generar cartas
function createOfferCard(id) {
    // Helper para obtener un valor aleatorio de un objeto
    const getRandomKey = (obj) => {
        const keys = Object.keys(obj);
        return keys[Math.floor(Math.random() * keys.length)];
    };

    // Generar servicios aleatorios
    const services = {};
    for (let service in filterOptions.Servicios) {
        services[service] = Math.random() > 0.5; // True o false aleatorio
    }

    // Generar número de habitaciones
    const rooms = Math.floor(Math.random() * 15); // De 0 a 200

    // Generar disponibilidad aleatoria (0 a rooms)
    const availability = Math.floor(Math.random() * (rooms + 1));

    // Crear la carta con valores generados
    const offerCard = {
        id: id,
        imageSrc: null,
        title: `Oferta ${id}`,  // Título simple, máximo 5 palabras
        location: getRandomKey(filterOptions.Ubicación),
        rating: Math.floor(Math.random() * 6), // Número del 0 al 5
        availability: availability,
        type: getRandomKey(filterOptions.Tipo),
        services: services,
        rooms: rooms,
        admits: getRandomKey(filterOptions.Admite),
        date: '',
        hidden: availability === 0 ? true : false
    };

    return offerCard;
}

// Crear múltiples cartas
function generateMultipleCards(count) {
    const cards = [];
    for (let i = 0; i < count; i++) {
        cards.push(createOfferCard(i + 1));
    }
    return cards;
}

//console.log(generateMultipleCards(100))
