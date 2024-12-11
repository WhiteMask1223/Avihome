export default function OffertsFormCheckBox({ objKey, subKey, value, handlerFunction, admits }) {
    return (
        <label className="py-0.5 inline-flex items-center cursor-pointer ml-2 sm:py-0">
            <input
                className="hidden peer"
                type="checkbox"
                onChange={
                    (e) => handlerFunction(objKey, subKey, admits, e.target.checked)
                }
                checked={value}
            />
            <span className="w-5 h-5 sm:w-4 sm:h-4 my-auto bg-checkboxThemeColor border-checkboxThemeBorder border rounded-full peer-checked:bg-checkboxThemeSelected peer-checked:border-transparent transition-all"></span>
            <span className="ml-2 w-fit text-lg overflow-hidden text-ellipsis whitespace-nowrap sm:text-base">{subKey}</span>
        </label>
    );
}