export default function DangerButton({ text, buttonFunction, ...props }) {
    return (
        <button
            onClick={buttonFunction}
            className="w-full mt-5 bg-[#ba0000] text-lg text-white p-2 font-bold rounded-lg sm:text-base py-2 px-4 transition duration-300 ease-in-out hover:bg-[#fa0707] focus:outline-none"
            {...props}
        >
            { text }
        </button>
    );
};