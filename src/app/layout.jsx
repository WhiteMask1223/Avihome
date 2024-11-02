import "./globals.css";
import 'remixicon/fonts/remixicon.css';


import ContextProvider from "@/components/ContextProvider";
import SessionWrapper from "@/components/SessionWrapper";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import SidebarDarkBg from "@/components/UI/SidebarDarkBg";
import LoadingBg from "@/components/UI/LoadingBg";

export const metadata = {
  title: "AviHome",
  description: "AviHome"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es"> 
      <body>
        <SessionWrapper>
          <ContextProvider>
            <NavBar></NavBar>
              {children}
            <Footer/>
            <SidebarDarkBg/>
            <LoadingBg/>
          </ContextProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
