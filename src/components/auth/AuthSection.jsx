export default function AuthSecction({children}) {
    return(
        <section className="h-fit w-full py-20 sm:py-28">
            <div className="w-full m-auto h-fit p-5 sm:bg-sectionThemeBackground sm:border border-sectionThemeBorder sm:rounded-2xl sm:shadow-lg sm:shadow-sectionThemeShadow sm:w-96">
                {children}
            </div>
        </section>
    )
}