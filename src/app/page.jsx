"use client"

import { useEffect, useContext } from "react";

import SidebarSection from "@/components/mainPage/aside/SidebarSection";
import OffertsMain from "@/components/mainPage/offertsPanel/OffertsMain";

import { MainPageContext } from "@/contexts/MainPage.context";
import { UtilityContex } from "@/contexts/Utility.context";

export default function HomePage() {

  const { loading, setLoading } = useContext(UtilityContex);
  const { offertsData } = useContext(MainPageContext)

  useEffect(() => {
    if (offertsData && loading === true) {
      setLoading(false);
    }
  })

  return (
    <main>
      <div className="flex">
        <SidebarSection></SidebarSection>
        <div className="h-full w-fit mx-auto text-center">
          <OffertsMain></OffertsMain>
        </div>
      </div>
    </main>
  );
}