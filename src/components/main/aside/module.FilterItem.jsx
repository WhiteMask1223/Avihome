export default function FilterItem({ Key, SubKey, value, data, handleClick }) {
    return(
        <label>
            <input 
                type="checkbox" 
                onChange={
                    (e) => handleClick([Key, SubKey, 'value'], e.target.checked)
                } 
                checked={value}
            />
            {data}
        </label>
    );
}