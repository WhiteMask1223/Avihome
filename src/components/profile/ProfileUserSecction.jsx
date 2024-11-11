"use client"

export default function ProfileUserSecction({ user, sameUser }) {
    if(!user) return

    return (
        <section className="w-full">
            <div className="bg-sectionThemeBackground p-6 rounded-2xl shadow-lg shadow-sectionThemeShadow w-11/12 m-auto mb-8" >

                <h2 className="text-xl font-bold mb-4">Perfil de Usuario</h2>

                <div className="sm:flex items-center justify-between">
                    <div className="sm:flex">
                        <i className="ri-account-circle-line text-6xl"></i>
                        <div className="my-auto">
                            <h3 className="text-lg font-semibold">{user.name}</h3>
                            {sameUser && <p>{user.email}</p>}
                        </div>
                    </div>
                    <div className="sm:text-right">
                        <p className="font-bold">Medios de Contacto:</p>
                        <p>{user.contEmail}</p>
                        <p>{user.phone}</p>
                        <p></p>
                    </div>
                </div>
                { sameUser &&
                    <div className="mt-4 flex items-center justify-between space-x-4">
                        <div className="flex flex-col">
                            <button className="bg-gray-200 px-4 py-2 rounded mb-2">Cambiar contraseña</button>
                            <button className="bg-gray-200 px-4 py-2 rounded">Cambiar Medios de Contacto</button>
                        </div>
                        <button className="bg-red-500 text-white px-4 py-2 rounded">Eliminar Cuenta</button>
                    </div>
                }
            </div >
        </section>
    )
}