import FilterItem from "./FilterItem";

export default function FilterCategory({ category, filterObj, handleClick}) {
    return(
        <details>
            <summary className="font-bold cursor-pointer max-w-56 overflow-hidden text-ellipsis whitespace-nowrap">{category}</summary>
            <div className="flex flex-col">
                            
                    {Object.entries(filterObj[category]).map(([key, { data, value }]) => (
                        <FilterItem key={key} objKey={category} objSubKey={key} value={value} data={data} handleClick={handleClick} />
                    ))}
                
            </div>
        </details>
    );
}