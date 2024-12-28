"use client"

import { useState, useEffect, useContext } from "react";

import { MainPageContext } from "@/contexts/MainPage.context";

import SidebarSection from "@/components/mainPage/aside/SidebarSection";
import OffertsMain from "@/components/mainPage/offertsPanel/OffertsMain";

export default function HomePage() {

  const [offertsFetched, setOffertsFetched] = useState(false);

  const { fetchOfferts } = useContext(MainPageContext)

  const getNewOfferts = async () => {
    try {
      const fetchResult = await fetchOfferts();
      setOffertsFetched(fetchResult);
    } catch (error) {
      console.error("getNewOfferts error: ", error)
    };
  };

  useEffect(() => {
    if (!offertsFetched) {
      getNewOfferts();
    };
  }, [offertsFetched]);

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