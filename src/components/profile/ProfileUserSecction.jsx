"use client"

export default function ProfileUserSecction({ user, sameUser }) {


    return (
        <section>

            {/* Sección de Perfil de Usuario */}

            < div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mb-8" >

                <h2 className="text-xl font-bold mb-4">Perfil de usuario</h2>
                
                <div className="flex items-center justify-between">
                    <div>
                        <div className="w-16 h-16 rounded-full bg-gray-300 mb-4"></div>
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold">Medios de Contacto:</p>
                        <p>{user.contEmail}</p>
                        <p>{user.phone}</p>
                        <p></p>
                    </div>
                </div>
                <div className="mt-4 flex space-x-4">
                    <button className="bg-gray-200 px-4 py-2 rounded">Cambiar contraseña</button>
                    <button className="bg-gray-200 px-4 py-2 rounded">Cambiar Medios de Contacto</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">Eliminar Cuenta</button>
                </div>
            </div >
        </section>
    )
}