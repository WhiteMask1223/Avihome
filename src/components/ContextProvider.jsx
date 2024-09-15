"use client"

import { CategoryFilterProvider } from "@/contexts/CategoryFilter.context"
import { MainPageProvider } from "@/contexts/MainPage.context";
import { UtilityProvider } from "@/contexts/Utility.context";

export default function ContextProvider({children}) {
    return(
        <UtilityProvider>
            <CategoryFilterProvider>
                <MainPageProvider>
                    {children}
                </MainPageProvider>
            </CategoryFilterProvider>
        </UtilityProvider>
    );
};