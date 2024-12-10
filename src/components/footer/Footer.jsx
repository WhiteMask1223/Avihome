export default function Footer() {
    return(
        <footer className="bg-teal-950 text-white py-6 mt-2 shadow-lg shadow-sectionThemeShadow">
            <div className="container mx-auto text-center">
            <p>2024 Avihome.</p>
            <div className="mt-2 flex justify-center space-x-4">
                <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">{ /*Preguntas Frecuentes*/ }</a>
                <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">{/*Términos de Servicio*/}</a>
            </div>
            </div>
        </footer>
    );
}