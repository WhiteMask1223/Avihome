"use client"

import { useState } from 'react';

export default function testFunction () {

  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState([
    { id: 1, title: 'Alabarda', ubicacion: 'Ubicación 1', rating: 4 },
    { id: 2, title: 'Departamento', ubicacion: 'Ubicación 2', rating: 5 },
    { id: 3, title: 'CUM', ubicacion: 'Ubicación 3', rating: 3 },
    // ...otras tarjetas
  ]);

  // Función para manejar el cambio en el término de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar las tarjetas basadas en el término de búsqueda
  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 mb-4 border border-gray-300 rounded"
      />

      <div className="grid grid-cols-3 gap-4">
        {filteredCards.slice(0, 15).map((card) => (
           <div className="border rounded-lg p-4">
           <div className="bg-gray-300 h-32 mb-2"></div>
           <h3 className="text-xl font-semibold">{card.title}</h3>
           <p className="text-gray-500">{card.ubicacion}</p>
           <div className="flex items-center">
             <span>{'⭐'.repeat(card.rating)}</span>
           </div>
         </div>
        ))}
      </div>
    </div>
  );
}