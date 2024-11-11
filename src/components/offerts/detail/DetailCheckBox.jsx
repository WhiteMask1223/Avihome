export default function DetailCheckBox({ text, checked }) {
    return (
        <label className={"py-0.5 inline-flex items-center ml-2 sm:py-0"}>
            <input
                className="hidden peer"
                type="checkbox"
                checked={checked}
                readOnly
            />
            <span className={"w-5 h-5 sm:w-4 sm:h-4 my-auto bg-checkboxThemeColor border-checkboxThemeBorder border rounded-full peer-checked:bg-checkboxThemeSelected peer-checked:border-transparent transition-all"}></span>

            <span className={"ml-2 text-lg overflow-hidden text-ellipsis whitespace-nowrap sm:text-base w-fit"}>{text}</span>
        </label>
    );
}