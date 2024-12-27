export default function DotButton({ buttonFunction, index, selectedIndex, ...props }) {
    return (
        <button
            className={`embla__dot ${index === selectedIndex ? "embla__dot--selected" : ""} mx-2`}
            type="button"
            onClick={buttonFunction}
            {...props}
        >
            {index === selectedIndex ?
                <i className="ri-checkbox-blank-circle-fill"></i>
                :
                <i className="ri-checkbox-blank-circle-line"></i>
            }
        </button>
    );
};