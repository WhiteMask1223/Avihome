import { CategoryFilterProvider } from "@/contexts/CategoryFilter.context"
import { MainPageProvider } from "@/contexts/MainPage.context";
import { UtilityProvider } from "@/contexts/Utility.context";
import { UserProvider } from "@/contexts/User.context";

export default function ContextProvider({ children }) {

    return (
        <UserProvider>
            <UtilityProvider>
                <CategoryFilterProvider>
                    <MainPageProvider>
                        {children}
                    </MainPageProvider>
                </CategoryFilterProvider>
            </UtilityProvider>
        </UserProvider>
    );
};