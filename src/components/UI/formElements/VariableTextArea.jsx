export default function VariableTextArea({ id, value, setStateFunction, cols, rows, error, ...props }) {
    return (
        <div>
            <textarea
                className={`px-4 py-1 mt-1 min-h-10 shrink flex-initial rounded-lg  w-full placeholder-gray-500 bg-elementThemeColor text-lg focus:outline-none focus:ring-2 transition duration-300 ease-in-out ${error ? "ring-2 ring-red-500 focus:ring" : "focus:ring-[#10c4b6]"}`}
                id={id}
                value={value}
                onChange={(e) => setStateFunction(id, e.target.value)}
                cols={cols}
                rows={rows}
                {...props}
            />

        </div>
    )
}