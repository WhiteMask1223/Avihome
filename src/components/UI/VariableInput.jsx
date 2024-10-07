export default function VariableInput({ type, id, value, setStateFunction, ...props }) {
    return (
        <div>
            <input
                className="px-4 mt-1 h-10 shrink flex-initial rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10c4b6] w-full placeholder-gray-500 bg-elementThemeColor text-lg  transition duration-300 ease-in-out"
                type={type}
                id={id}
                value={value}
                onChange={(e) => setStateFunction(id, e.target.value)}
                {...props}
            />
        </div>
    )
}