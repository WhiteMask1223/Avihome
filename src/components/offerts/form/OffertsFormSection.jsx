export default function OffertsFormSection({ children }) {

    return (
        <div className="pt-24 sm:px-6 min-h-screen flex flex-col items-center">
            <section className="bg-sectionThemeBackground sm:px-6 py-6 sm:rounded-2xl shadow-lg shadow-sectionThemeShadow w-full sm:w-11/12 sm:max-w-4xl m-auto">

               {children}

            </section>
        </div>
    )
}