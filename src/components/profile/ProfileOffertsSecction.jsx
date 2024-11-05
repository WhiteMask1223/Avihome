export default function ProfileOffertsSecction() {
    return (
        <section>
            {/* Sección de Ofertas Publicadas */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                <h2 className="text-xl font-bold mb-4">Ofertas Publicadas</h2>
                <div className="flex justify-between mb-4 text-center">
                    <button className="text-lg">&lt;&lt;</button>
                    <span>1 / 3</span>
                    <button className="text-lg">&gt;&gt;</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tarjeta de Oferta */}
                    <div className="p-4 bg-white rounded-lg border shadow-sm">
                        <h3 className="font-bold">Nombre de la oferta</h3>
                        <p className="text-sm text-gray-600">Urb. Analiza Melano</p>
                        <p className="text-sm mt-2">Parte de la descripcion introducida por el usuario.</p>
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-2">
                                <button className="w-6 h-6 bg-green-500 rounded"></button> {/* Reemplaza con ícono de subir */}
                                <span>2</span>
                                <button className="w-6 h-6 bg-red-500 rounded"></button> {/* Reemplaza con ícono de bajar */}
                            </div>
                            <button className="w-6 h-6 bg-gray-400 rounded"></button> {/* Reemplaza con ícono de editar */}
                            <button className="w-6 h-6 bg-red-500 rounded"></button> {/* Reemplaza con ícono de eliminar */}
                        </div>
                    </div>

                    {/* Otra Tarjeta de Oferta */}
                    <div className="p-4 bg-red-100 rounded-lg border shadow-sm">
                        <h3 className="font-bold">Nombre de la oferta</h3>
                        <p className="text-sm text-gray-600">Barrio El Prieto</p>
                        <p className="text-sm mt-2">Parte de la descripcion colocada por el usuario.</p>
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-2">
                                <button className="w-6 h-6 bg-green-500 rounded"></button> {/* Reemplaza con ícono de subir */}
                                <span>0</span>
                                <button className="w-6 h-6 bg-red-500 rounded"></button> {/* Reemplaza con ícono de bajar */}
                            </div>
                            <button className="w-6 h-6 bg-gray-400 rounded"></button> {/* Reemplaza con ícono de editar */}
                            <button className="w-6 h-6 bg-red-500 rounded"></button> {/* Reemplaza con ícono de eliminar */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};