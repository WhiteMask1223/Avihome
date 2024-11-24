export default function OffertsFormSection({ children }) {

    return (
        <div className="p-6 pt-24 min-h-screen flex flex-col items-center">
            <section className="bg-sectionThemeBackground p-6 rounded-2xl shadow-lg shadow-sectionThemeShadow w-11/12 max-w-4xl m-auto">

               {children}

            </section>
        </div>
    )
}