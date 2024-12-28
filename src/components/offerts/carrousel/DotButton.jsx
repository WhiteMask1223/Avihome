export default function DotButton({ buttonFunction, index, selectedIndex, ...props }) {
    return (
        <button
            className={`embla__dot ${index === selectedIndex ? "embla__dot--selected" : ""} mx-2`}
            type="button"
            onClick={buttonFunction}
            {...props}
        >
            <i className={`ri-checkbox-blank-circle-${index === selectedIndex ? "fill" : "line"} text-submitButtonColor font-bold transition duration-300 ease-in-out`}></i>
        </button>
    );
};