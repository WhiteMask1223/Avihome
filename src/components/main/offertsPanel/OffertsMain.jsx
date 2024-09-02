"use client"

import { useContext } from "react";

import { MainPagePaginationContext } from "@/contexts/MainPagePagination.context";

import PagingCounter from "./PagingCounter";
import OffertCard from "./OffertCard";

export default function OffertsMain() {

    const {currentPage, totalPages, renderedCards, pageChangeHandler} = useContext(MainPagePaginationContext);


    return (
        <div>
            <PagingCounter pageChangeHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages}/>

            <div className="grid grid-cols-3 gap-3 px-4">
                {renderedCards.map((card) => (
                    <OffertCard
                    key={card.id}
                    imageSrc={card.imageSrc}
                    title={card.title}
                    location={card.location}
                    rating={card.rating}
                    disponibility={card.id}
                    services={card.services}
                    type={card.type}
                    />
                ))}   
            </div>
            
            <PagingCounter pageChangeHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages}/>
        </div>
    );
}