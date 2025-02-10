import AppLogo from "../UI/utility/AppLogo"

export default function AuthSecction({ children }) {
    return (
        <section className="h-fit w-full py-20 sm:py-28">
            <div className="flex items-center w-fit mx-auto my-5">
                
                <AppLogo width={"60"} height={"60"} fixedTheme={false} />
                <p className="font-bold text-3xl text-teal-950 ml-2">Avi</p>
                <p className="font-bold text-3xl text-teal-800">Home</p>
            </div>

            <div className="w-full m-auto h-fit p-5 sm:bg-sectionThemeBackground sm:border border-sectionThemeBorder sm:rounded-2xl sm:shadow-lg sm:shadow-sectionThemeShadow sm:w-96">
                {children}
            </div>
        </section>
    )
}