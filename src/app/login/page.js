"use client"

import { useState, useEffect } from 'react';

const initialFilters = {
  Tipo: {
    Anexo: true,
    Casa: true,
    'Complejo Residencial': true,
    Departamento: true,
    Habitacion: true,
  },
  Ubicación: {
    'Urb. Rómulo Gallegos': true,
    'Barrio Texto que excede los limites': true,
    Centro: true,
    'Las Palmas': true,
    Terminal: true,
  },
  Servicios: {
    Agua: true,
    'Aire Acondicionado': true,
    Electricidad: true,
    Gas: true,
    Internet: true,
  },
  'Número de Habitaciones': {
    'Una Habitación': true,
    'Dos a Cinco Hablitaciones': true,
    'Cinco a Diez Habitaciones': true,
    'Más de Diez Habitaciones': true,
  },
  Admite: {
    Hombres: false,
    Mujeres: false,
    Cualquiera: true,
  },
  sortBy: 'bestRated',
  showHidden: false,
};

const initialCards = [
  {
    id: 0,
    imageSrc: null,
    title: 'Nombre de Ejemplo',
    location: 'Urb. Rómulo Gallegos',
    rating: 5,
    disponibility: 10,
    type: 'Complejo Residencial',
    services: {
      Agua: true,
      'Aire Acondicionado': true,
      Electricidad: true,
      Gas: true,
      Internet: true,
    },
    rooms: 15,
    admits: 'Cualquiera',
    date: '',
    hidden: false,
  },
  // ... más tarjetas
];

export default function CardsPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [cards, setCards] = useState(initialCards);
  const [filteredCards, setFilteredCards] = useState([]);

  // Filtrar las tarjetas cuando cambian los filtros
  useEffect(() => {
    const applyFilters = () => {
      const filtered = cards.filter((card) => {
        // Filtrar por Tipo
        const typeFilter = filters.Tipo[card.type];

        // Filtrar por Ubicación
        const locationFilter = filters.Ubicación[card.location];

        // Filtrar por Servicios
        const servicesFilter = Object.entries(filters.Servicios).every(
          ([service, isSelected]) => !isSelected || card.services[service]
        );

        // Filtrar por Número de Habitaciones
        let roomsFilter = true;
        if (filters['Número de Habitaciones']['Una Habitación'] && card.rooms === 1) {
          roomsFilter = true;
        } else if (
          filters['Número de Habitaciones']['Dos a Cinco Hablitaciones'] &&
          card.rooms >= 2 &&
          card.rooms <= 5
        ) {
          roomsFilter = true;
        } else if (
          filters['Número de Habitaciones']['Cinco a Diez Habitaciones'] &&
          card.rooms >= 6 &&
          card.rooms <= 10
        ) {
          roomsFilter = true;
        } else if (
          filters['Número de Habitaciones']['Más de Diez Habitaciones'] &&
          card.rooms > 10
        ) {
          roomsFilter = true;
        } else {
          roomsFilter = false;
        }

        // Filtrar por Admite
        const admitsFilter = filters.Admite[card.admits];

        // Filtrar por "Mostrar Ocultos"
        const hiddenFilter = filters.showHidden ? true : !card.hidden;

        // Devolver verdadero si todos los filtros coinciden
        return (
          typeFilter &&
          locationFilter &&
          servicesFilter &&
          roomsFilter &&
          admitsFilter &&
          hiddenFilter
        );
      });

      // Ordenar tarjetas según sortBy
      const sortedFiltered = [...filtered].sort((a, b) => {
        if (filters.sortBy === 'bestRated') {
          return b.rating - a.rating; // Ordenar por mejor calificación
        } else if (filters.sortBy === 'availability') {
          return b.disponibility - a.disponibility; // Ordenar por disponibilidad
        } else {
          return 0; // Sin ordenamiento específico
        }
      });

      setFilteredCards(sortedFiltered);
    };

    applyFilters();
  }, [filters, cards]);

  return (
    <div>
      <h1>Tarjetas Filtradas</h1>
      <div className="card-container">
        {filteredCards.map((card) => (
          <div key={card.id} className="card">
            <h2>{card.title}</h2>
            <p>Ubicación: {card.location}</p>
            <p>Tipo: {card.type}</p>
            <p>Habitaciones: {card.rooms}</p>
            <p>Servicios: {Object.keys(card.services).join(', ')}</p>
            <p>Admite: {card.admits}</p>
          </div>
        ))}
      </div>
    </div>
  );
}