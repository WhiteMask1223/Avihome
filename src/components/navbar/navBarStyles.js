export const NAVBAR_STYLES = {
    

    /*                         { NavBar }                         */

    GENERAL: "fixed h-fit top-0 left-0 w-screen bg-[#405453] z-50 p-1 shadow-lg sm:h-[80px]",


    /*                         { NavSessionSidebar }                         */

    SIDEBAR: (sessionSidebar) => {
        return(`fixed right-0 pt-24 h-full w-screen sm:w-64 bg-sectionThemeBackground p-6 transform transition-transform duration-300 ease-in-out z-40 ${sessionSidebar ? 'translate-x-0' : 'translate-x-full'}`)
    },

    SIDEBAR_LI:"w-full items-center py-3 border border-transparent border-b-sectionThemeShadow",


    /*                         { SearchBar }                         */

    SEARCH_INPUT: (filterSidebar) => {
        return(`px-4 py-2 h-10 shrink flex-initial rounded-tl-lg rounded-bl-lg focus:outline-none ${filterSidebar ? "w-full placeholder-gray-500 bg-elementThemeColor text-lg" : "placeholder-gray-600 w-56 text-black"}`)
    },

    CLEAR_BUTTON: (filterSidebar, disableCondition) => {
        return(`px-4 py-1 h-10 rounded-tr-lg rounded-br-lg disabled  transition duration-300 ease-in-out group ${filterSidebar ? "" : "bg-white hover:bg-red-100"} ${disableCondition ? "bg-dangerButtonDisableThemeColor" : "bg-dangerButtonThemeColor"}`)
    },

    BUTTON_ICON: (filterSidebar, disableCondition) => {
        return(`ri-close-large-line transition duration-300 ease-in-out ${filterSidebar ? "text-dangerButtonIconsThemeColor" : "text-gray-500 group-hover:text-red-500"} ${disableCondition ? "text-white dark:text-black" : ""}`)
    }
}