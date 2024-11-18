export default function SubmitButton({text}) {
    return (
        <button
            type="submit"
            className="w-full mt-5 bg-[#0B8D83] text-lg text-white p-2 font-bold rounded-lg sm:text-base py-2 px-4 transition duration-300 ease-in-out hover:bg-[#10c4b6] focus:outline-none"
        >
            { text }
        </button>
    )
}