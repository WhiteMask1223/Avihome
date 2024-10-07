import "./globals.css";
import 'remixicon/fonts/remixicon.css';


import ContextProvider from "@/components/ContextProvider";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import SidebarDarkBg from "@/components/UI/SidebarDarkBg";

export const metadata = {
  title: "AviHome",
  description: "AviHome"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ContextProvider>
          <NavBar></NavBar>
            {children}
          <Footer></Footer>
          <SidebarDarkBg></SidebarDarkBg>
        </ContextProvider>
      </body>
    </html>
  );
}
