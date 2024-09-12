import FilterItem from "./FilterItem";

import { ASIDE_STYLES } from "./asideStyles";

export default function FilterCategory({ category, filterObj, handleClick}) {
    return(
        <details className="group">
            <summary className={ASIDE_STYLES.CATEGORY_STYLE}>
                <i class={`${filterObj.icons[category]} ${ASIDE_STYLES.CATEGORY_ICON_STYLE}`}></i> 
                {category}
            </summary>
            
            <div className="flex flex-col">
                            
                    {Object.entries(filterObj[category]).map(([key]) => (
                        <FilterItem key={key} objKey={category} objSubKey={key} filterObj={filterObj} handleClick={handleClick} />
                    ))}
                
            </div>
        </details>
    );
}