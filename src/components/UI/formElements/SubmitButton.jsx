import LoadingSpinners from "../utility/LoadingSpinners"

export default function SubmitButton({ styles, text, disabled, ...props }) {
    return (
        <button
            type="submit"
            className={`${styles || " p-2 py-2 px-4 "} ${ disabled ? "bg-submitButtonDisabledColor cursor-wait" : "bg-submitButtonColor hover:bg-submitButtonHoverColor"} sm:text-lg text-white font-bold rounded-lg sm:text-base transition duration-300 ease-in-out focus:outline-none`}
            disabled={disabled}
            {...props}
        >
            { disabled ? <LoadingSpinners/> : text }
        </button>
    )
}