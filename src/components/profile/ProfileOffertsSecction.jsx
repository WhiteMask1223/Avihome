export default function ProfileOffertsSecction() {
    return (
        <section className="w-full">

            {/* Sección de Ofertas Publicadas */}

            <div className="bg-sectionThemeBackground p-6 rounded-lg shadow-lg shadow-sectionThemeShadow w-11/12 m-auto">

                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold my-auto">Ofertas Publicadas</h2>
                    <button className="flex justify-between text-center p-2">
                        <p className="m-auto">Agregar Oferta</p>
                        <i className="ri-add-box-fill text-3xl text-green-500"></i>
                    </button>
                </div>

                <div className="flex justify-between mb-4 text-center">
                    <button className="text-lg">&lt;&lt;</button>
                    <span>1 / 3</span>
                    <button className="text-lg">&gt;&gt;</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   
                </div>
            </div>
        </section>
    )
};