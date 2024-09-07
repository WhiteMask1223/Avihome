"use client"

import { CategoryFilterProvider } from "@/contexts/CategoryFilter.context"
import { MainPageProvider } from "@/contexts/MainPage.context";

export default function ContextProvider({children}) {
    return(
        <CategoryFilterProvider>
            <MainPageProvider>
                {children}
            </MainPageProvider>
        </CategoryFilterProvider>
    );
};