import ArrowBotton from "./ArrowBotton";

export default function PagingCounter({pageChangeHandler, page, totalPages}) {
    return(
        <div className="flex items-center justify-center space-x-2">
            
            <ArrowBotton action={'first'} onClickHandler={pageChangeHandler} page={page} totalPages={totalPages} direction={'left'} double={true}/>

            <ArrowBotton action={'previous'} onClickHandler={pageChangeHandler} page={page} totalPages={totalPages} direction={'left'} double={false}/>

            <span className="font-bold">{page}</span>

            <ArrowBotton action={'next'} onClickHandler={pageChangeHandler} page={page} totalPages={totalPages} direction={'right'} double={false}/>

            <ArrowBotton action={'last'} onClickHandler={pageChangeHandler} page={page} totalPages={totalPages} direction={'right'} double={true}/>

        </div>
    )
}