export const offertType = {
    'Anexo': false,
    'Casa': false,
    'Complejo Residencial': false,
    'Departamento': false,
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
    'Barrio Las Mercedes': false,
    'Urb. Santa Isabel': false,
    'Urb. Los Laureles': false,
    'Barrio La Ceiba': false,
    'Barrio Puerta Negra': false,
    'Barrio Bicentenerio': false,
    'Barrio La Morera': false,
    'Barrio Pueblo Nuevo': false,
    'Urb. Los Naranjos': false,
    'Urb. Altos de Fénix': false,
    'Urb. Antonio Miguel Martínez': false,
    'Barrio Lucianro': false,
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


export const offertsData = [
    {
        "id": 1,
        "imageSrc": null,
        "title": "Oferta 1",
        "location": "Barrio La Morera",
        "rating": 4,
        "availability": 1,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 9,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 2,
        "imageSrc": null,
        "title": "Oferta 2",
        "location": "Barrio Bicentenerio",
        "rating": 1,
        "availability": 1,
        "type": "Departamento",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": false
        },
        "rooms": 3,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 3,
        "imageSrc": null,
        "title": "Oferta 3",
        "location": "Urb. Los Naranjos",
        "rating": 2,
        "availability": 0,
        "type": "Complejo Residencial",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": true,
            "Internet": false
        },
        "rooms": 2,
        "admits": "Cualquiera",
        "date": "",
        "hidden": true
    },
    {
        "id": 4,
        "imageSrc": null,
        "title": "Oferta 4",
        "location": "Las Abejitas",
        "rating": 1,
        "availability": 10,
        "type": "Habitación",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 13,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 5,
        "imageSrc": null,
        "title": "Oferta 5",
        "location": "Barrio La Ceiba",
        "rating": 5,
        "availability": 9,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 13,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 6,
        "imageSrc": null,
        "title": "Oferta 6",
        "location": "Las Palmas",
        "rating": 5,
        "availability": 2,
        "type": "Casa",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 4,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 7,
        "imageSrc": null,
        "title": "Oferta 7",
        "location": "Barrio Pueblo Nuevo",
        "rating": 5,
        "availability": 3,
        "type": "Complejo Residencial",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": true,
            "Internet": true
        },
        "rooms": 3,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 8,
        "imageSrc": null,
        "title": "Oferta 8",
        "location": "Barrio Bicentenerio",
        "rating": 4,
        "availability": 0,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 2,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": true
    },
    {
        "id": 9,
        "imageSrc": null,
        "title": "Oferta 9",
        "location": "Urb. Los Naranjos",
        "rating": 3,
        "availability": 2,
        "type": "Anexo",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 2,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 10,
        "imageSrc": null,
        "title": "Oferta 10",
        "location": "Barrio Puerta Negra",
        "rating": 1,
        "availability": 0,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 0,
        "admits": "Cualquiera",
        "date": "",
        "hidden": true
    },
    {
        "id": 11,
        "imageSrc": null,
        "title": "Oferta 11",
        "location": "Barrio Texto que excede los limites",
        "rating": 5,
        "availability": 4,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": true,
            "Internet": true
        },
        "rooms": 9,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 12,
        "imageSrc": null,
        "title": "Oferta 12",
        "location": "Urb. Los Naranjos",
        "rating": 4,
        "availability": 2,
        "type": "Complejo Residencial",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 2,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 13,
        "imageSrc": null,
        "title": "Oferta 13",
        "location": "Las Abejitas",
        "rating": 4,
        "availability": 3,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": true,
            "Internet": false
        },
        "rooms": 4,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 14,
        "imageSrc": null,
        "title": "Oferta 14",
        "location": "Las Palmas",
        "rating": 2,
        "availability": 4,
        "type": "Complejo Residencial",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": true,
            "Internet": false
        },
        "rooms": 5,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 15,
        "imageSrc": null,
        "title": "Oferta 15",
        "location": "Barrio La Morera",
        "rating": 3,
        "availability": 1,
        "type": "Complejo Residencial",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 4,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 16,
        "imageSrc": null,
        "title": "Oferta 16",
        "location": "Urb. Los Morros",
        "rating": 2,
        "availability": 1,
        "type": "Casa",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 13,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 17,
        "imageSrc": null,
        "title": "Oferta 17",
        "location": "Barrio Bicentenerio",
        "rating": 4,
        "availability": 4,
        "type": "Anexo",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 10,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 18,
        "imageSrc": null,
        "title": "Oferta 18",
        "location": "Barrio Texto que excede los limites",
        "rating": 0,
        "availability": 0,
        "type": "Anexo",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": false
        },
        "rooms": 3,
        "admits": "Cualquiera",
        "date": "",
        "hidden": true
    },
    {
        "id": 19,
        "imageSrc": null,
        "title": "Oferta 19",
        "location": "Terminal",
        "rating": 1,
        "availability": 2,
        "type": "Casa",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 2,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 20,
        "imageSrc": null,
        "title": "Oferta 20",
        "location": "Urb. Rómulo Gallegos",
        "rating": 2,
        "availability": 2,
        "type": "Casa",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 10,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 21,
        "imageSrc": null,
        "title": "Oferta 21",
        "location": "Terminal",
        "rating": 4,
        "availability": 4,
        "type": "Habitación",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": true,
            "Internet": true
        },
        "rooms": 5,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 22,
        "imageSrc": null,
        "title": "Oferta 22",
        "location": "Las Abejitas",
        "rating": 5,
        "availability": 5,
        "type": "Casa",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 5,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 23,
        "imageSrc": null,
        "title": "Oferta 23",
        "location": "Barrio Bicentenerio",
        "rating": 3,
        "availability": 0,
        "type": "Anexo",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 5,
        "admits": "Cualquiera",
        "date": "",
        "hidden": true
    },
    {
        "id": 24,
        "imageSrc": null,
        "title": "Oferta 24",
        "location": "Urb. Los Morros",
        "rating": 2,
        "availability": 1,
        "type": "Complejo Residencial",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 10,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 25,
        "imageSrc": null,
        "title": "Oferta 25",
        "location": "Centro",
        "rating": 3,
        "availability": 4,
        "type": "Complejo Residencial",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 7,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 26,
        "imageSrc": null,
        "title": "Oferta 26",
        "location": "Las Palmas",
        "rating": 4,
        "availability": 0,
        "type": "Anexo",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": true,
            "Internet": false
        },
        "rooms": 6,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": true
    },
    {
        "id": 27,
        "imageSrc": null,
        "title": "Oferta 27",
        "location": "Bario Las Mercedes",
        "rating": 2,
        "availability": 11,
        "type": "Anexo",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": true,
            "Internet": false
        },
        "rooms": 14,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 28,
        "imageSrc": null,
        "title": "Oferta 28",
        "location": "Urb. Los Jardines",
        "rating": 1,
        "availability": 3,
        "type": "Habitación",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 13,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 29,
        "imageSrc": null,
        "title": "Oferta 29",
        "location": "Las Palmas",
        "rating": 4,
        "availability": 4,
        "type": "Complejo Residencial",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 4,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 30,
        "imageSrc": null,
        "title": "Oferta 30",
        "location": "Centro",
        "rating": 2,
        "availability": 7,
        "type": "Anexo",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": true,
            "Internet": true
        },
        "rooms": 10,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 31,
        "imageSrc": null,
        "title": "Oferta 31",
        "location": "Barrio La Morera",
        "rating": 4,
        "availability": 0,
        "type": "Habitación",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 10,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": true
    },
    {
        "id": 32,
        "imageSrc": null,
        "title": "Oferta 32",
        "location": "Barrio La Ceiba",
        "rating": 3,
        "availability": 7,
        "type": "Habitación",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 9,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 33,
        "imageSrc": null,
        "title": "Oferta 33",
        "location": "Barrio Pueblo Nuevo",
        "rating": 1,
        "availability": 1,
        "type": "Anexo",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 3,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 34,
        "imageSrc": null,
        "title": "Oferta 34",
        "location": "Urb. Los Laureles",
        "rating": 5,
        "availability": 0,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 1,
        "admits": "Cualquiera",
        "date": "",
        "hidden": true
    },
    {
        "id": 35,
        "imageSrc": null,
        "title": "Oferta 35",
        "location": "Urb. Los Laureles",
        "rating": 0,
        "availability": 4,
        "type": "Anexo",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": true,
            "Internet": true
        },
        "rooms": 10,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 36,
        "imageSrc": null,
        "title": "Oferta 36",
        "location": "Urb. Rómulo Gallegos",
        "rating": 0,
        "availability": 1,
        "type": "Casa",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 2,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 37,
        "imageSrc": null,
        "title": "Oferta 37",
        "location": "Barrio Texto que excede los limites",
        "rating": 3,
        "availability": 1,
        "type": "Anexo",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": true,
            "Internet": true
        },
        "rooms": 1,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 38,
        "imageSrc": null,
        "title": "Oferta 38",
        "location": "Barrio Pueblo Nuevo",
        "rating": 5,
        "availability": 8,
        "type": "Complejo Residencial",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 10,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 39,
        "imageSrc": null,
        "title": "Oferta 39",
        "location": "Barrio Puerta Negra",
        "rating": 4,
        "availability": 3,
        "type": "Anexo",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": true,
            "Internet": true
        },
        "rooms": 5,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 40,
        "imageSrc": null,
        "title": "Oferta 40",
        "location": "Barrio Bicentenerio",
        "rating": 3,
        "availability": 12,
        "type": "Departamento",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": true,
            "Internet": true
        },
        "rooms": 13,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 41,
        "imageSrc": null,
        "title": "Oferta 41",
        "location": "Urb. Los Jardines",
        "rating": 1,
        "availability": 7,
        "type": "Anexo",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 8,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 42,
        "imageSrc": null,
        "title": "Oferta 42",
        "location": "Las Palmas",
        "rating": 5,
        "availability": 3,
        "type": "Anexo",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": false
        },
        "rooms": 10,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 43,
        "imageSrc": null,
        "title": "Oferta 43",
        "location": "Terminal",
        "rating": 0,
        "availability": 9,
        "type": "Departamento",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": false
        },
        "rooms": 12,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 44,
        "imageSrc": null,
        "title": "Oferta 44",
        "location": "Barrio Bicentenerio",
        "rating": 1,
        "availability": 3,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": false
        },
        "rooms": 5,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 45,
        "imageSrc": null,
        "title": "Oferta 45",
        "location": "Barrio Puerta Negra",
        "rating": 3,
        "availability": 3,
        "type": "Casa",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": false,
            "Internet": false
        },
        "rooms": 4,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 46,
        "imageSrc": null,
        "title": "Oferta 46",
        "location": "Barrio Pueblo Nuevo",
        "rating": 3,
        "availability": 0,
        "type": "Anexo",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": false
        },
        "rooms": 0,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": true
    },
    {
        "id": 47,
        "imageSrc": null,
        "title": "Oferta 47",
        "location": "Urb. Los Jardines",
        "rating": 4,
        "availability": 7,
        "type": "Habitación",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": false
        },
        "rooms": 8,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 48,
        "imageSrc": null,
        "title": "Oferta 48",
        "location": "Zona Industrial",
        "rating": 3,
        "availability": 5,
        "type": "Habitación",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 5,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 49,
        "imageSrc": null,
        "title": "Oferta 49",
        "location": "Las Abejitas",
        "rating": 1,
        "availability": 1,
        "type": "Complejo Residencial",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 1,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 50,
        "imageSrc": null,
        "title": "Oferta 50",
        "location": "Las Abejitas",
        "rating": 4,
        "availability": 2,
        "type": "Anexo",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": false
        },
        "rooms": 5,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 51,
        "imageSrc": null,
        "title": "Oferta 51",
        "location": "Terminal",
        "rating": 5,
        "availability": 1,
        "type": "Casa",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": true,
            "Internet": true
        },
        "rooms": 1,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 52,
        "imageSrc": null,
        "title": "Oferta 52",
        "location": "Barrio Texto que excede los limites",
        "rating": 2,
        "availability": 0,
        "type": "Habitación",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 1,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": true
    },
    {
        "id": 53,
        "imageSrc": null,
        "title": "Oferta 53",
        "location": "Urb. Rómulo Gallegos",
        "rating": 1,
        "availability": 0,
        "type": "Casa",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": true,
            "Internet": false
        },
        "rooms": 7,
        "admits": "Cualquiera",
        "date": "",
        "hidden": true
    },
    {
        "id": 54,
        "imageSrc": null,
        "title": "Oferta 54",
        "location": "Barrio La Morera",
        "rating": 1,
        "availability": 3,
        "type": "Casa",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 13,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 55,
        "imageSrc": null,
        "title": "Oferta 55",
        "location": "Urb. Rómulo Gallegos",
        "rating": 5,
        "availability": 5,
        "type": "Complejo Residencial",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": true,
            "Internet": false
        },
        "rooms": 11,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 56,
        "imageSrc": null,
        "title": "Oferta 56",
        "location": "Barrio Bicentenerio",
        "rating": 1,
        "availability": 1,
        "type": "Casa",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": true,
            "Internet": false
        },
        "rooms": 10,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 57,
        "imageSrc": null,
        "title": "Oferta 57",
        "location": "Terminal",
        "rating": 1,
        "availability": 5,
        "type": "Habitación",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 6,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 58,
        "imageSrc": null,
        "title": "Oferta 58",
        "location": "Barrio Bicentenerio",
        "rating": 3,
        "availability": 8,
        "type": "Complejo Residencial",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 13,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 59,
        "imageSrc": null,
        "title": "Oferta 59",
        "location": "Barrio Puerta Negra",
        "rating": 0,
        "availability": 8,
        "type": "Complejo Residencial",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 10,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 60,
        "imageSrc": null,
        "title": "Oferta 60",
        "location": "Terminal",
        "rating": 2,
        "availability": 4,
        "type": "Habitación",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": false,
            "Internet": false
        },
        "rooms": 5,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 61,
        "imageSrc": null,
        "title": "Oferta 61",
        "location": "Zona Industrial",
        "rating": 0,
        "availability": 4,
        "type": "Habitación",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": true,
            "Internet": false
        },
        "rooms": 12,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 62,
        "imageSrc": null,
        "title": "Oferta 62",
        "location": "Barrio Pueblo Nuevo",
        "rating": 4,
        "availability": 1,
        "type": "Complejo Residencial",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 11,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 63,
        "imageSrc": null,
        "title": "Oferta 63",
        "location": "Barrio Pueblo Nuevo",
        "rating": 4,
        "availability": 8,
        "type": "Casa",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 8,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 64,
        "imageSrc": null,
        "title": "Oferta 64",
        "location": "Urb. Los Jardines",
        "rating": 3,
        "availability": 5,
        "type": "Habitación",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": false,
            "Internet": false
        },
        "rooms": 6,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 65,
        "imageSrc": null,
        "title": "Oferta 65",
        "location": "Las Palmas",
        "rating": 5,
        "availability": 4,
        "type": "Departamento",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": false
        },
        "rooms": 8,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 66,
        "imageSrc": null,
        "title": "Oferta 66",
        "location": "Terminal",
        "rating": 1,
        "availability": 1,
        "type": "Departamento",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 1,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 67,
        "imageSrc": null,
        "title": "Oferta 67",
        "location": "Centro",
        "rating": 3,
        "availability": 2,
        "type": "Habitación",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 4,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 68,
        "imageSrc": null,
        "title": "Oferta 68",
        "location": "Urb. Los Morros",
        "rating": 2,
        "availability": 0,
        "type": "Casa",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 2,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": true
    },
    {
        "id": 69,
        "imageSrc": null,
        "title": "Oferta 69",
        "location": "Urb. Los Morros",
        "rating": 1,
        "availability": 2,
        "type": "Casa",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 3,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 70,
        "imageSrc": null,
        "title": "Oferta 70",
        "location": "Las Palmas",
        "rating": 5,
        "availability": 3,
        "type": "Departamento",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 10,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 71,
        "imageSrc": null,
        "title": "Oferta 71",
        "location": "Urb. Los Morros",
        "rating": 2,
        "availability": 0,
        "type": "Habitación",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 2,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": true
    },
    {
        "id": 72,
        "imageSrc": null,
        "title": "Oferta 72",
        "location": "Las Abejitas",
        "rating": 2,
        "availability": 10,
        "type": "Departamento",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 11,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 73,
        "imageSrc": null,
        "title": "Oferta 73",
        "location": "Barrio Bicentenerio",
        "rating": 5,
        "availability": 1,
        "type": "Anexo",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 5,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 74,
        "imageSrc": null,
        "title": "Oferta 74",
        "location": "Bario Las Mercedes",
        "rating": 1,
        "availability": 5,
        "type": "Complejo Residencial",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": false
        },
        "rooms": 8,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 75,
        "imageSrc": null,
        "title": "Oferta 75",
        "location": "Barrio Puerta Negra",
        "rating": 1,
        "availability": 10,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": true,
            "Internet": false
        },
        "rooms": 11,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 76,
        "imageSrc": null,
        "title": "Oferta 76",
        "location": "Centro",
        "rating": 2,
        "availability": 7,
        "type": "Casa",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": true,
            "Internet": true
        },
        "rooms": 9,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 77,
        "imageSrc": null,
        "title": "Oferta 77",
        "location": "Bario Las Mercedes",
        "rating": 1,
        "availability": 12,
        "type": "Anexo",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 13,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 78,
        "imageSrc": null,
        "title": "Oferta 78",
        "location": "Bario Las Mercedes",
        "rating": 1,
        "availability": 0,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": false
        },
        "rooms": 8,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": true
    },
    {
        "id": 79,
        "imageSrc": null,
        "title": "Oferta 79",
        "location": "Urb. Los Naranjos",
        "rating": 1,
        "availability": 4,
        "type": "Casa",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": false
        },
        "rooms": 7,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 80,
        "imageSrc": null,
        "title": "Oferta 80",
        "location": "Urb. Los Jardines",
        "rating": 1,
        "availability": 5,
        "type": "Habitación",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": false
        },
        "rooms": 13,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 81,
        "imageSrc": null,
        "title": "Oferta 81",
        "location": "Barrio Puerta Negra",
        "rating": 0,
        "availability": 0,
        "type": "Complejo Residencial",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 1,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": true
    },
    {
        "id": 82,
        "imageSrc": null,
        "title": "Oferta 82",
        "location": "Urb. Los Jardines",
        "rating": 5,
        "availability": 2,
        "type": "Habitación",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": true,
            "Internet": false
        },
        "rooms": 3,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 83,
        "imageSrc": null,
        "title": "Oferta 83",
        "location": "Urb. Los Naranjos",
        "rating": 2,
        "availability": 0,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 0,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": true
    },
    {
        "id": 84,
        "imageSrc": null,
        "title": "Oferta 84",
        "location": "Urb. Los Laureles",
        "rating": 2,
        "availability": 1,
        "type": "Anexo",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": false
        },
        "rooms": 4,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 85,
        "imageSrc": null,
        "title": "Oferta 85",
        "location": "Centro",
        "rating": 3,
        "availability": 2,
        "type": "Complejo Residencial",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": false
        },
        "rooms": 6,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 86,
        "imageSrc": null,
        "title": "Oferta 86",
        "location": "Bario Las Mercedes",
        "rating": 1,
        "availability": 8,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": true,
            "Internet": false
        },
        "rooms": 9,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 87,
        "imageSrc": null,
        "title": "Oferta 87",
        "location": "Urb. Los Laureles",
        "rating": 1,
        "availability": 5,
        "type": "Casa",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": false
        },
        "rooms": 5,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 88,
        "imageSrc": null,
        "title": "Oferta 88",
        "location": "Barrio La Ceiba",
        "rating": 3,
        "availability": 8,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": false
        },
        "rooms": 10,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 89,
        "imageSrc": null,
        "title": "Oferta 89",
        "location": "Las Palmas",
        "rating": 2,
        "availability": 3,
        "type": "Casa",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": true,
            "Internet": true
        },
        "rooms": 3,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 90,
        "imageSrc": null,
        "title": "Oferta 90",
        "location": "Centro",
        "rating": 1,
        "availability": 0,
        "type": "Habitación",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": true,
            "Internet": false
        },
        "rooms": 0,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": true
    },
    {
        "id": 91,
        "imageSrc": null,
        "title": "Oferta 91",
        "location": "Urb. Los Naranjos",
        "rating": 3,
        "availability": 0,
        "type": "Complejo Residencial",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": false,
            "Internet": true
        },
        "rooms": 5,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": true
    },
    {
        "id": 92,
        "imageSrc": null,
        "title": "Oferta 92",
        "location": "Barrio Texto que excede los limites",
        "rating": 3,
        "availability": 0,
        "type": "Habitación",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": false,
            "Internet": false
        },
        "rooms": 4,
        "admits": "Cualquiera",
        "date": "",
        "hidden": true
    },
    {
        "id": 93,
        "imageSrc": null,
        "title": "Oferta 93",
        "location": "Barrio Bicentenerio",
        "rating": 2,
        "availability": 10,
        "type": "Anexo",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": false
        },
        "rooms": 11,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": false
    },
    {
        "id": 94,
        "imageSrc": null,
        "title": "Oferta 94",
        "location": "Barrio Pueblo Nuevo",
        "rating": 3,
        "availability": 2,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 4,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 95,
        "imageSrc": null,
        "title": "Oferta 95",
        "location": "Urb. Los Morros",
        "rating": 5,
        "availability": 0,
        "type": "Departamento",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": false,
            "Gas": true,
            "Internet": true
        },
        "rooms": 4,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": true
    },
    {
        "id": 96,
        "imageSrc": null,
        "title": "Oferta 96",
        "location": "Zona Industrial",
        "rating": 0,
        "availability": 2,
        "type": "Casa",
        "services": {
            "Agua": true,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": true,
            "Internet": false
        },
        "rooms": 6,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 97,
        "imageSrc": null,
        "title": "Oferta 97",
        "location": "Barrio La Ceiba",
        "rating": 0,
        "availability": 0,
        "type": "Departamento",
        "services": {
            "Agua": true,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": false
        },
        "rooms": 0,
        "admits": "Solo Mujeres",
        "date": "",
        "hidden": true
    },
    {
        "id": 98,
        "imageSrc": null,
        "title": "Oferta 98",
        "location": "Zona Industrial",
        "rating": 4,
        "availability": 14,
        "type": "Casa",
        "services": {
            "Agua": false,
            "Aire Acondicionado": true,
            "Electricidad": true,
            "Gas": false,
            "Internet": true
        },
        "rooms": 14,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    },
    {
        "id": 99,
        "imageSrc": null,
        "title": "Oferta 99",
        "location": "Barrio Puerta Negra",
        "rating": 0,
        "availability": 3,
        "type": "Casa",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": true,
            "Gas": false,
            "Internet": false
        },
        "rooms": 14,
        "admits": "Cualquiera",
        "date": "",
        "hidden": false
    },
    {
        "id": 100,
        "imageSrc": null,
        "title": "Oferta 100",
        "location": "Barrio Puerta Negra",
        "rating": 4,
        "availability": 1,
        "type": "Casa",
        "services": {
            "Agua": false,
            "Aire Acondicionado": false,
            "Electricidad": false,
            "Gas": false,
            "Internet": false
        },
        "rooms": 3,
        "admits": "Solo Hombres",
        "date": "",
        "hidden": false
    }
]