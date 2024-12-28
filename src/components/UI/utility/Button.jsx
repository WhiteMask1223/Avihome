export default function Button({ styles, text, buttonFunction, disabled, ...props }) {
    return (
        <button
            onClick={buttonFunction}
            className={` bg-neutral-500 dark:bg-neutral-600 text-lg text-white font-bold rounded-lg sm:text-base py-2 px-4 transition duration-300 ease-in-out hover:bg-neutral-300 dark:hover:bg-neutral-500 focus:outline-none ${styles}`}
            {...props}
        >
            { text }
        </button>
    );
};