export default function ArrowBotton({action, onClickHandler, currentPage, totalPages, direction, double}) {


    const disabledHandler = () => {
        if(currentPage === 1 && direction === 'left'){return true};
        if(currentPage === totalPages && direction === 'right'){return true};
        if(totalPages === 0){return true}
        return false
    };

    return(
        <button
                onClick = {() => {onClickHandler(action)}}
                disabled = {disabledHandler()}   
                className={`${
                disabledHandler() ? "text-arrowDisableThemeColor" : "text-arrowThemeColor"
                } text-xl`}
            >
            {double === true ? <i className={`ri-arrow-${direction}-double-line`}></i> : <i className={`ri-arrow-${direction}-s-line`}></i>}
        </button>
    )
}