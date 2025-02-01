"use client"

import { useContext } from "react";

import { MainPageContext } from "@/contexts/MainPage.context";

import PagingCounter from "./PagingCounter";
import OffertCard from "./OffertCard";
import NoResults from "@/components/UI/utility/NoResults";
import LoadingSpinners from "@/components/UI/utility/LoadingSpinners";
import { IS_DEVELOPMENT } from "@/config";

import { OFFERTS_PANEL_STYLES } from "./offertsPanelStyles";


export default function OffertsMain() {

    const {
        currentPage,
        totalPages,
        renderedCards,
        pageChangeHandler,
        fetchingOfferts
    } = useContext(MainPageContext);

    return (
        <section className="mt-24 relative">
            {!renderedCards.length ?
                <NoResults />
                :
                <div>
                    <PagingCounter pageChangeHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages} />

                    {fetchingOfferts ?
                        <div className="h-screen flex items-center">
                            <div className="w-fit h-fit mx-auto">
                            <LoadingSpinners size={"large"}/>
                            </div>
                        </div>
                        :
                        <div className={OFFERTS_PANEL_STYLES.MAIN_GRID}>
                            {renderedCards.map((card, idx) => (
                                <OffertCard
                                    key={idx}
                                    id={card._id}
                                    imageSrc={IS_DEVELOPMENT ? card.localImages[0] : card.images[0]?.url}
                                    title={card.title}
                                    location={card.location}
                                    rating={card.rating}
                                    availability={card.availability}
                                />
                            ))}
                        </div>
                    }

                    <PagingCounter pageChangeHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages} />
                </div>
            }
        </section>
    );
};