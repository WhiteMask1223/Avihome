"use client"

import { useContext } from "react";

import { MainPageContext } from "@/contexts/MainPage.context";

import PagingCounter from "./PagingCounter";
import OffertCard from "./OffertCard";

export default function OffertsMain() {

    const {currentPage, totalPages, renderedCards, pageChangeHandler} = useContext(MainPageContext);


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
                    availability={card.availability}
                    type={card.type}
                    />
                ))}   
            </div>
            
            <PagingCounter pageChangeHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages}/>
        </div>
    );
}