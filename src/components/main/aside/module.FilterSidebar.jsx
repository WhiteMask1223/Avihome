"use client"

import { useState } from 'react';

import FilterCategory from './module.FilterCategory';
import { filterObjConstructor } from './filterObjConstructor';

export default function FilterSidebar() {

  const [filterObj, setFilterObj] = useState(filterObjConstructor);
  const [ordenarPor, setOrdenarPor] = useState('mejorPuntuados');
  const [mostrarOcultos, setMostrarOcultos] = useState(false);

  const handleCheckboxChange = (path, newValue) => {
      setFilterObj(prevState => {

        let newState = { ...prevState };
        let current = newState;
    
        for (let i = 0; i < path.length - 1; i++) {
          current[path[i]] = { ...current[path[i]] };
          current = current[path[i]];
        }
    
        current[path[path.length - 1]] = newValue;
    
        return newState;
      });
  };

  const resetFilters = () => {
    setOrdenarPor('mejorPuntuados');
    setMostrarOcultos(false);
    setFilterObj(filterObjConstructor);
  };

  return (
    <aside className="p-4 w-64 text-left">
      <div>

        {Object.entries(filterObj).map(([key]) => (
          <FilterCategory key={key} category={key} filterObj={filterObj} handleClick={handleCheckboxChange}/>
        ))}

        <div className="mt-4">
          <label className="block font-bold">Ordenado Por:</label>
          <select className="mt-1 block w-full border-gray-900 bg-gray-800" value={ordenarPor} onChange={(e) => setOrdenarPor(e.target.value)}>
            <option value="mejorPuntuados">Mejor Puntuados</option>
            <option value="peorPuntuados">Peor Puntuados</option>
            <option value="masRecientes">Más Recientes</option>
            <option value="masAntiguos">Más Antiguos</option>
          </select>
        </div>

        <div className="mt-4">
          <label><input type="checkbox" onChange={() => setMostrarOcultos(!mostrarOcultos)} checked={mostrarOcultos} /> Mostrar Ocultos</label>
        </div>

        <div className="mt-4">
          <button onClick={resetFilters} className="w-full bg-teal-500 text-white p-2 rounded">Limpiar Filtros</button>
        </div>
      </div>
    </aside>
  );
}
