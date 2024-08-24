"use client"

import { CategoryFilterProvider } from "@/contexts/CategoryFilter.context"
import { MainPagePaginationProvider } from "@/contexts/MainPagePagination.context";

export default function ContextProvider({children}) {
    return(
        <CategoryFilterProvider>
            <MainPagePaginationProvider>
                {children}
            </MainPagePaginationProvider>
        </CategoryFilterProvider>
    );
};