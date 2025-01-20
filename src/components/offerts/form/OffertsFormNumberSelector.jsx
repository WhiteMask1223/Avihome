"use client"

import { useState, useEffect } from "react";

export default function NumberSelector({ objKey, objSubKey, value, maxNumber, setStateFunction, typeValue, typeArray }) {
    

    const [disableHandler, setDisableHandler] = useState(false);

    const changeRoomsAvailableHandler = async (action) => {

        const newAvailabilityValue = updateRoomsAvailable(action);


        if (objSubKey) {
            setStateFunction(objKey, objSubKey, false, value + newAvailabilityValue);
            return;
        };

        setStateFunction(objKey, value + newAvailabilityValue);
    };

    const updateRoomsAvailable = (action) => {

        if (action === 'up') {
            if (value < maxNumber) {
                return 1;
            } else {
                return null
            };
        } else if (action === 'down') {
            if (value > 0) {
                return -1;
            } else {
                return null
            };
        };
    };

    const disabledHandler = (direction) => {
        if (direction === "up" && value === maxNumber) return true
        if (direction === "down" && value === 0) return true
        return false
    };

    useEffect(() => {
    
        if (!typeArray.length) return;

        setDisableHandler(false);

        typeArray.map((data) => {
            if (typeValue === data.text && data.onlyOneRoom) {
                setDisableHandler(true);

                if (objSubKey) {
                    setStateFunction(objKey, objSubKey, false, 1)
                    return;
                };

                setStateFunction(objKey, 1);

                return;
            };
            console.log(disableHandler);
            console.log(typeArray, typeValue);

        });
    }, [typeValue]);

    return (
        <div className="flex items-center space-x-2 mt-3 mx-auto w-fit">
            <button
                type="button"
                className="w-fit h-fit"
                onClick={() => changeRoomsAvailableHandler('up')}
                disabled={disableHandler || disabledHandler("up")}
            >
                <i className={`ri-arrow-up-circle-fill text-3xl transition duration-300 ease-in-out ${disabledHandler("up") || disableHandler ? "text-arrowDisableThemeColor" : "text-arrowThemeColor"}`}></i>
            </button>

            <div className="w-fit min-w-12 text-center">
                <span className="font-bold">
                    {value}
                </span>
            </div>

            <button
                type="button"
                className="w-fit h-fit"
                onClick={() => changeRoomsAvailableHandler('down')}
                disabled={disableHandler || disabledHandler("down")}
            >
                <i className={`ri-arrow-down-circle-fill text-3xl transition duration-300 ease-in-out ${disabledHandler("down") || disableHandler ? "text-arrowDisableThemeColor" : "text-arrowThemeColor"}`}></i>
            </button>
        </div>
    );
};