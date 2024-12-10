import "./globals.css";
import 'remixicon/fonts/remixicon.css';

import Head from "next/head";

import ContextProvider from "@/components/ContextProvider";
import SessionWrapper from "@/components/SessionWrapper";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import SidebarDarkBg from "@/components/UI/utility/SidebarDarkBg";
import LoadingBg from "@/components/UI/utility/LoadingBg";

export const metadata = {
  title: "AviHome",
  description: "AviHome"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      
      <head>
        <link rel="icon" type="image/png" href="favicon-light.png" media="(prefers-color-scheme: light)"/>
        <link rel="icon" type="image/png" href="favicon-dark.png" media="(prefers-color-scheme: dark)"/>
      </head>

      <body className="flex flex-col min-h-screen">
        <SessionWrapper>
          <ContextProvider>
            <div className="flex-grow">
              <NavBar></NavBar>
              {children}
              <SidebarDarkBg />
              <LoadingBg conditional={false}/>
            </div>
            <Footer/>
          </ContextProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
