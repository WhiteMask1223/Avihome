export default function FilterItem({ objKey, objSubKey, value, data, handleClick }) {
    return(
        <label className="inline-flex items-center cursor-pointer ml-2">
            <input
                className="hidden peer"
                type="checkbox" 
                onChange={
                    (e) => handleClick(objKey, objSubKey, e.target.checked)
                } 
                checked={value}
            />
            <span className="w-4 h-4 my-auto bg-checkboxThemeColor border-checkboxThemeBorder border rounded-full peer-checked:bg-checkboxThemeSelected peer-checked:border-transparent"></span>
            <span className="ml-2 max-w-48 overflow-hidden text-ellipsis whitespace-nowrap">{data}</span> 
        </label>
    );
}