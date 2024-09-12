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

export const offertsData = generateMultipleCards(100);