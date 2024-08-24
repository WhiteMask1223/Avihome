"use client"

import { useContext } from "react";

import { MainPagePaginationContext } from "@/contexts/MainPagePagination.context";

import PagingCounter from "./PagingCounter";

export default function OffertsMain() {

    const {page, totalPages, pageChangeHandler} = useContext(MainPagePaginationContext);

    return (
        <div>
            <PagingCounter pageChangeHandler={pageChangeHandler} page={page} totalPages={totalPages}/>
            
            <PagingCounter pageChangeHandler={pageChangeHandler} page={page} totalPages={totalPages}/>
        </div>
    );
}
