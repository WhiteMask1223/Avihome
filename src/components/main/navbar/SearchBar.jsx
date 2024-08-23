export default function SearchBar() {
    return(
        <div>
            <input 
            type="text"
            placeholder="Buscar por Nombre"
            className="px-4 py-2 rounded-tl-lg rounded-bl-lg"
        />
        <button className="bg-[#0FAB9F] text-white px-4 py-2 rounded-tr-lg rounded-br-lg hover:bg-[#0B8D83]">Buscar</button>
        </div>
    )
}