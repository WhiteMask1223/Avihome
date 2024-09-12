import "./globals.css";
import 'remixicon/fonts/remixicon.css';


import ContextProvider from "@/components/ContextProvider";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "AviHome",
  description: "AviHome"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="pt-20">
        <ContextProvider>
          <NavBar></NavBar>
            {children}
          <Footer></Footer>
        </ContextProvider>
      </body>
    </html>
  );
}
