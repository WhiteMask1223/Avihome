export default function ArrowBotton({action, onClickHandler, page, totalPages, direction, double}) {


    const disabledHandler = () => {
        if(page === 1 && direction === 'left'){return true};
        if(page === totalPages && direction === 'right'){return true};
        return false
    };

    return(
        <button
                onClick = {() => {onClickHandler(action)}}
                disabled = {direction === 'left' ? page === 1 : page === totalPages}   
                className={`${
                disabledHandler() ? "text-arrowDisableThemeColor" : "text-arrowThemeColor"
                } text-xl`}
            >
            {double === true ? <i className={`ri-arrow-${direction}-double-line`}></i> : <i className={`ri-arrow-${direction}-s-line`}></i>}
        </button>
    )
}