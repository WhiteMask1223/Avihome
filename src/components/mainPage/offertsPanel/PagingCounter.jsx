import ArrowBotton from "../../UI/utility/ArrowBotton";

export default function PagingCounter({pageChangeHandler, currentPage, totalPages}) {
    return(
        <div className="flex items-center justify-center space-x-2 my-3">
            
            <ArrowBotton acction={'first'} onClickHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages} direction={'left'} double={true}/>

            <ArrowBotton acction={'previous'} onClickHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages} direction={'left'} double={false}/>

            <span className="font-bold text-xl sm:text-base">{currentPage}</span>

            <ArrowBotton acction={'next'} onClickHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages} direction={'right'} double={false}/>

            <ArrowBotton acction={'last'} onClickHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages} direction={'right'} double={true}/>

        </div>
    )
}