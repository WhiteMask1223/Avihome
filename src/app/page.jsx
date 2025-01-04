"use client"

import { useState, useEffect, useContext, useCallback } from "react";

import { MainPageContext } from "@/contexts/MainPage.context";

import SidebarSection from "@/components/mainPage/aside/SidebarSection";
import OffertsMain from "@/components/mainPage/offertsPanel/OffertsMain";
import Button from "@/components/UI/utility/Button";

export default function HomePage() {

  const [offertsFetched, setOffertsFetched] = useState(false);
  const [fetching, setFetching] = useState(false);

  const { fetchOfferts } = useContext(MainPageContext)

  const getNewOfferts = useCallback(async () => {
    try {
      const fetchResult = await fetchOfferts();
      setOffertsFetched(fetchResult);
    } catch (error) {
      console.error("getNewOfferts error: ", error)
    };
  }, [fetchOfferts]);

  useEffect(() => {
    if (!offertsFetched) {
      getNewOfferts();
    };
  }, [/*offertsFetched, getNewOfferts*/]);

  return (
    <main>
      <div className="flex">

        <div className="absolute top-24 right-5">

          <Button
            styles={`py-0 px-1 w-8 h-8 place-content-center ${fetching ? "cursor-wait" : ""}`}
            buttonFunction={() => {
              setFetching(true)
              fetchOfferts().then(() => {
                setFetching(false);
              });
            }}
            disabled={fetching}
            text={<div>
              <i className={`ri-refresh-line text-2xl ${ fetching ? "text-gray-400" : ""}`} />
            </div>}
          />
        </div>

        <SidebarSection></SidebarSection>
        <div className="h-full w-fit mx-auto text-center">
          <OffertsMain></OffertsMain>
        </div>
      </div>
    </main>
  );
}