"use client"

import { CategoryFilterProvider } from "@/contexts/CategoryFilter.context"
import { MainPageProvider } from "@/contexts/MainPage.context";
import { SidebarsProvider } from "@/contexts/Sidebars.context";

export default function ContextProvider({children}) {
    return(
        <SidebarsProvider>
            <CategoryFilterProvider>
                <MainPageProvider>
                    {children}
                </MainPageProvider>
            </CategoryFilterProvider>
        </SidebarsProvider>
    );
};