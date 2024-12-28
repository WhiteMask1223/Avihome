"use client"

import { useContext } from "react";

import { MainPageContext } from "@/contexts/MainPage.context";

import PagingCounter from "./PagingCounter";
import OffertCard from "./OffertCard";
import NoResults from "@/components/UI/utility/NoResults";

import { OFFERTS_PANEL_STYLES } from "./offertsPanelStyles";


export default function OffertsMain() {

    const {
        currentPage,
        totalPages,
        renderedCards,
        pageChangeHandler
    } = useContext(MainPageContext);


    return (
        <section className="mt-24 relative">

            

            {!renderedCards.length ?
                <NoResults />
                :
                <div>
                    <PagingCounter pageChangeHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages} />

                    <div className={OFFERTS_PANEL_STYLES.MAIN_GRID}>
                        {renderedCards.map((card) => (
                            <OffertCard
                                key={card._id}
                                id={card._id}
                                imageSrc={card.images[0]?.url}
                                title={card.title}
                                location={card.location}
                                rating={card.rating}
                                availability={card.availability}
                            />
                        ))}
                    </div>

                    <PagingCounter pageChangeHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages} />
                </div>
            }


        </section>
    );
}