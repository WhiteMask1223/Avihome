"use client"

import { useContext } from 'react';

import { CategoryFilterContext } from '@/contexts/CategoryFilter.context';

import FilterCategory from './FilterCategory';


export default function FilterSidebar() {

  const { filterObj, handleCheckboxChange, sortAndHiddenHandler, resetFilters } = useContext(CategoryFilterContext);

  return (
    <aside className="p-3 w-64 text-left">
      <div>

        {Object.entries(filterObj).slice(0, 5).map(([key]) => (
          <FilterCategory key={key} category={key} filterObj={filterObj} handleClick={handleCheckboxChange}/>
        ))}

        <div className="mt-4">
          <label className="block font-bold max-w-56 overflow-hidden text-ellipsis whitespace-nowrap">Ordenado Por:</label>
          <select className="mt-1 p-2 rounded-md block w-full bg-elementThemeColor" value={filterObj.sortBy} onChange={(e) => sortAndHiddenHandler('sortBy', e.target.value)}>
            <option value="bestRated">Mejor Puntuados</option>
            <option value="worstRated">Peor Puntuados</option>
            <option value="latest">Más Recientes</option>
            <option value="older">Más Antiguos</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="inline-flex items-center cursor-pointer ml-2">
              <input className="hidden peer" type="checkbox" onChange={() => sortAndHiddenHandler('showHidden', !filterObj.showHidden)} checked={filterObj.showHidden}/>
              <span className="w-4 h-4 my-auto bg-checkboxThemeColor border border-checkboxThemeBorder rounded-full peer-checked:bg-checkboxThemeSelected peer-checked:border-transparent"></span>
              <span className="ml-2 max-w-48 overflow-hidden text-ellipsis whitespace-nowrap">Mostrar Ocultos</span> 
          </label>
        </div>
        
        <div className="mt-4">
          <button onClick={resetFilters} className="w-full bg-[#0B8D83] text-white p-2 rounded">Limpiar Filtros</button>
        </div>
      </div>
    </aside>
  );
}
