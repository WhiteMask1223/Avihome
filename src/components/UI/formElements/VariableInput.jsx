export default function VariableInput({ type, id, value, setStateFunction, error, ...props }) {
    return (
        <div>
            <input
                className={`px-4 mt-1 h-10 shrink flex-initial rounded-lg  w-full placeholder-gray-500 bg-elementThemeColor text-lg focus:outline-none focus:ring-2 transition duration-300 ease-in-out ${error ? "ring-2 ring-red-500 focus:ring" : "focus:ring-[#10c4b6]"}`}
                type={type}
                id={id}
                value={value}
                onChange={(e) => setStateFunction(id, e.target.value)}
                {...props}
            />
        </div>
    )
}