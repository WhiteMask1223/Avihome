export const ASIDE_STYLES = {


    /*                         { SidebarSection }                         */

    MAIN_SECTION: (filterSidebar) => {
        return(`fixed sm:static text-left left-0 h-full w-screen  bg-sectionThemeBackground p-6 pt-20 transform overflow-scroll  transition-transform duration-300 ease-in-out z-40 ${ filterSidebar ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'} sm:w-64 xl:w-96 sm:pt-24 sm:z-10 sm:bg-transparent sm:overflow-hidden`)
    },

    SORT_BY_LABEl: "block text-lg font-bold max-w-56 overflow-hidden text-ellipsis whitespace-nowrap sm:text-base ",
    SORT_BY_DROPOLIST: "mt-1 p-2 text-lg rounded-md block w-full bg-elementThemeColor sm:text-base ",

    SHOW_HIDDEN_LABEL: "inline-flex items-center cursor-pointer ml-2",
    SHOW_HIDDEN_TEXT: "ml-2 max-w-48 text-lg overflow-hidden text-ellipsis whitespace-nowrap sm:text-base ",

    RESET_FILTERS_BUTTON: "w-full bg-[#0B8D83] text-lg text-white p-2 rounded-lg sm:text-base py-2 px-4 transition duration-300 ease-in-out hover:bg-[#10c4b6] focus:outline-none",


    /*                         { FilterCategory }                         */


    CATEGORY_STYLE: "font-bold my-0.5 text-lg cursor-pointer flex items-center max-w-56 overflow-hidden text-ellipsis whitespace-nowrap sm:text-base sm:my-0",

    CATEGORY_ICON_STYLE: "mr-2 text-checkboxThemeSelected group-open:text-2xl sm:group-open:text-xl transition-all",


    /*                         { FilterItem }                         */


    ITEM_LABEL: "py-0.5 inline-flex items-center cursor-pointer ml-2 sm:py-0",
    ITEM_TEXT: "ml-2 w-40 text-lg overflow-hidden text-ellipsis whitespace-nowrap sm:text-base xl:w-fit",


    /*                         { varios }                         */


    CHECKBOX: "w-5 h-5 sm:w-4 sm:h-4 my-auto bg-checkboxThemeColor border-checkboxThemeBorder border rounded-full peer-checked:bg-checkboxThemeSelected peer-checked:border-transparent transition-all"
}