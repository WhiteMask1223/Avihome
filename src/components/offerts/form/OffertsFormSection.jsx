export default function OffertsFormSection({ children }) {

    return (
        <section className="p-6 pt-24 min-h-screen flex flex-col items-center">
            <div className="bg-sectionThemeBackground p-6 rounded-2xl shadow-lg shadow-sectionThemeShadow w-11/12 max-w-4xl m-auto">

               {children}

            </div>
        </section>
    )
}