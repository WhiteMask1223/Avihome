export default function ArrowBotton({action, onClickHandler, currentPage, totalPages, direction, double}) {


    const disabledHandler = () => {
        if(currentPage === 1 && direction === 'left'){return true};
        if(currentPage === totalPages && direction === 'right'){return true};
        return false
    };

    return(
        <button
                onClick = {() => {onClickHandler(action)}}
                disabled = {direction === 'left' ? currentPage === 1 : currentPage === totalPages}   
                className={`${
                disabledHandler() ? "text-arrowDisableThemeColor" : "text-arrowThemeColor"
                } text-xl`}
            >
            {double === true ? <i className={`ri-arrow-${direction}-double-line`}></i> : <i className={`ri-arrow-${direction}-s-line`}></i>}
        </button>
    )
}