export default function Footer() {
    return(
        <footer className="bg-[#1d2626] text-white py-4 mt-2">
            <div className="container mx-auto text-center">
            <p>2024 Avihome.</p>
            <div className="mt-2 flex justify-center space-x-4">
                <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">Preguntas Frecuentes</a>
                <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">Términos de Servicio</a>
            </div>
            </div>
        </footer>
    );
}