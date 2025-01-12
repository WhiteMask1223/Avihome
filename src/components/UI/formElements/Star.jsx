export default function Star({ index, value, buttonFuction }) {
    return (
        <div
            className="cursor-pointer text-checkboxThemeSelected"
            onClick={buttonFuction}
        >
            {index === 0 ?
                (
                    value === 0 ?
                        <i className="ri-indeterminate-circle-fill text-base"></i>
                        :
                        <i className="ri-indeterminate-circle-line text-base font-bold"></i>
                )
                :
                (
                    index <= value ?
                        <i className="ri-star-fill"></i>
                        :
                        <i className="ri-star-line"></i>
                )
            }
        </div>
    );
};