"use client"

import { CategoryFilterProvider } from "@/contexts/CategoryFilter.context"

export default function ContextProvider({children}) {
    return(
        <CategoryFilterProvider>
            {children}
        </CategoryFilterProvider>
    );
};