"use client"

import { useContext } from 'react';

import { CategoryFilterContext } from '@/contexts/CategoryFilter.context';
import { UtilityContex } from '@/contexts/Utility.context';

import FilterCategory from '@/components/mainPage/aside/FilterCategory';
import SearchBar from '@/components/navbar/SearchBar';

import { ASIDE_STYLES } from './asideStyles';


export default function SidebarSection() {

    const { filterObj, handleCheckboxChange, sortAndHiddenHandler, resetFilters } = useContext(CategoryFilterContext);
    const { filterSidebar } = useContext(UtilityContex)

    return (
        <section className={`fixed sm:static text-left left-0 h-full w-screen sm:w-64 bg-sectionThemeBackground sm:bg-transparent p-6 transform overflow-scroll ${ filterSidebar ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'} transition-transform duration-300 ease-in-out z-40 sm:z-10`}>
            <aside>
                <div>

                    <SearchBar filterSidebar={true}></SearchBar>

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