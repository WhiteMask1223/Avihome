export default function NextButton({ buttonFunction, disabled, ...props }) {
    return (
        <button
            className="embla__button embla__button--prev hidden  sm:block w-32 rounded-tl-lg bg-sectionThemeBackground shadow-lg shadow-sectionThemeShadow"
            type="button"
            onClick={buttonFunction}
            disabled={disabled}
            {...props}
        >
            <i className={`ri-arrow-right-s-line text-xl transition duration-300 ease-in-out ${ disabled ? "text-grayFontThemeColor" : "font-bold" }`}></i>
        </button>
    );
};