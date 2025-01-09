export default function NumberSelector() {
    return (
        <div className="flex items-center space-x-2 mt-3">
            <button
                className="w-fit h-fit"
                onClick={() => changeRoomsAvailableHandler('up')}
                disabled={disableChangeAvailability || disabledHandler("up")}
            >
                <i className={`ri-arrow-up-circle-fill text-3xl transition duration-300 ease-in-out ${disabledHandler("up") || disableChangeAvailability ? "text-arrowDisableThemeColor" : "text-arrowThemeColor"}`}></i>
            </button>

            <div className="w-fit min-w-12 text-center">
                {disableChangeAvailability ?
                    <LoadingSpinners />
                    :
                    <span className="font-bold">
                        {cardOffert.availability.roomsAvailable}
                        {' '}/{' '}
                        {cardOffert.availability.capacity}
                    </span>
                }
            </div>

            <button
                className="w-fit h-fit"
                onClick={() => changeRoomsAvailableHandler('down')}
                disabled={disableChangeAvailability || disabledHandler("down")}
            >
                <i className={`ri-arrow-down-circle-fill text-3xl transition duration-300 ease-in-out ${disabledHandler("down") || disableChangeAvailability ? "text-arrowDisableThemeColor" : "text-arrowThemeColor"}`}></i>
            </button>
        </div>
    );
};