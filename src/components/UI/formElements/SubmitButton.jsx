import LoadingSpinners from "../utility/LoadingSpinners"

export default function SubmitButton({ styles, text, disabled, ...props }) {
    return (
        <button
            type="submit"
            className={`${styles} ${ disabled ? "bg-submitButtonDisabledColor cursor-wait" : "bg-submitButtonColor hover:bg-submitButtonHoverColor"} text-lg text-white p-2 font-bold rounded-lg sm:text-base py-2 px-4 transition duration-300 ease-in-out  focus:outline-none`}
            disabled={disabled}
            {...props}
        >
            { disabled ? <LoadingSpinners/> : text }
        </button>
    )
}