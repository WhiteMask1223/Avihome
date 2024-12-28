export default function PrevButton({ buttonFunction, disabled, ...props }) {
    return (
        <button
            className="embla__button embla__button--prev hidden  sm:block w-32 rounded-tr-lg bg-sectionThemeBackground shadow-lg shadow-sectionThemeShadow"
            type="button"
            onClick={buttonFunction}
            disabled={disabled}
            {...props}
        >
            <i className={`ri-arrow-left-s-line text-xl transition duration-300 ease-in-out ${ disabled ? "text-grayFontThemeColor" : "font-bold" }`}></i>
        </button>
    );
};