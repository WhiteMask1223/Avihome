import FilterItem from "./module.FilterItem";

export default function FilterCategory({ category, filterObj, handleClick}) {
    return(
        <details>
            <summary className="font-bold">{category}</summary>
            <div className="flex flex-col">
                            
                    {Object.entries(filterObj[category]).map(([key, { data, value }]) => (
                        <FilterItem key={key} Key={category} SubKey={key} value={value} data={data} handleClick={handleClick} />
                    ))}
                
            </div>
        </details>
    );
}