export default function Button({ styles, text, buttonFunction, disabled, ...props }) {
    return (
        <button
            onClick={buttonFunction}
            className={`text-lg text-white font-bold rounded-lg sm:text-base transition duration-300 ease-in-out hover:bg-neutral-400 dark:hover:bg-neutral-500 focus:outline-none ${styles || ""} ${ disabled ? "bg-neutral-600 dark:bg-neutral-700" : "bg-neutral-500 dark:bg-neutral-600"}`}
            {...props}
        >
            { text }
        </button>
    );
};