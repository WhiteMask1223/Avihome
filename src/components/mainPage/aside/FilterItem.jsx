import { ASIDE_STYLES } from "./asideStyles";

export default function FilterItem({ objKey, objSubKey, filterObj, handleClick }) {
    return(
        <label className={ASIDE_STYLES.ITEM_LABEL}>
            <input
                id={objSubKey}
                className="hidden peer"
                type="checkbox" 
                onChange={
                    (e) => handleClick(objKey, objSubKey, e.target.checked)
                } 
                checked={filterObj[objKey][objSubKey]}
            />
            <span className={ASIDE_STYLES.CHECKBOX}></span>
            <span className={ASIDE_STYLES.ITEM_TEXT}>{objSubKey}</span> 
        </label>
    );
}