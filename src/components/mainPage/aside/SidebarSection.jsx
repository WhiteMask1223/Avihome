"use client"

import { useContext } from 'react';

import { CategoryFilterContext } from '@/contexts/CategoryFilter.context';

import FilterCategory from '@/components/mainPage/aside/FilterCategory';

import { ASIDE_STYLES } from './asideStyles';


export default function SidebarSection() {

  const { filterObj, handleCheckboxChange, sortAndHiddenHandler, resetFilters } = useContext(CategoryFilterContext);

  return (
    <section className="p-3 w-64 text-left">
        <aside>
            <div>

                {Object.entries(filterObj).slice(0, 5).map(([key]) => (
                <FilterCategory key={key} category={key} filterObj={filterObj} handleClick={handleCheckboxChange}/>
                ))}

                <div className="mt-4">
                    <label className={ASIDE_STYLES.SORT_BY_LABEl}>Ordenado Por:</label>
                    <select className={ASIDE_STYLES.SORT_BY_DROPOLIST} value={filterObj.sortBy} onChange={(e) => sortAndHiddenHandler('sortBy', e.target.value)}>
                        <option value="bestRated">Mejor Puntuados</option>
                        <option value="worstRated">Peor Puntuados</option>
                        <option value="higherAvailability">Mayor Disponibilidad</option>
                        <option value="lowerAvailability">Menor Disponibilidad</option>
                        <option value="latest">Más Recientes</option>
                        <option value="older">Más Antiguos</option>
                    </select>
                </div>

                <div className="mt-4">
                    <label className={ASIDE_STYLES.SHOW_HIDDEN_LABEL}>
                        <input className="hidden peer" type="checkbox" onChange={() => sortAndHiddenHandler('showHidden', !filterObj.showHidden)} checked={filterObj.showHidden}/>
                        <span className={ASIDE_STYLES.CHECKBOX}></span>
                        <span className={ASIDE_STYLES.SHOW_HIDDEN_TEXT}>Mostrar Ocultos</span> 
                    </label>
                </div>
                
                <div className="mt-4">
                    <button onClick={resetFilters} className={ASIDE_STYLES.RESET_FILTERS_BUTTON}>Limpiar Filtros</button>
                </div>

            </div>
        </aside>
    </section>
  );
}