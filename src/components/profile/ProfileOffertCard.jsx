export default function ProfileOffertsCard() {
    return (
        <card>
            {/* Tarjeta de Oferta */}
            < div className="p-4 bg-white rounded-lg border shadow-sm" >
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
            </div >

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
        </card>
    )
}