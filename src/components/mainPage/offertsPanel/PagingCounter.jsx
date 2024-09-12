import ArrowBotton from "./ArrowBotton";

export default function PagingCounter({pageChangeHandler, currentPage, totalPages}) {
    return(
        <div className="flex items-center justify-center space-x-2 my-3">
            
            <ArrowBotton action={'first'} onClickHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages} direction={'left'} double={true}/>

            <ArrowBotton action={'previous'} onClickHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages} direction={'left'} double={false}/>

            <span className="font-bold">{currentPage}</span>

            <ArrowBotton action={'next'} onClickHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages} direction={'right'} double={false}/>

            <ArrowBotton action={'last'} onClickHandler={pageChangeHandler} currentPage={currentPage} totalPages={totalPages} direction={'right'} double={true}/>

        </div>
    )
}