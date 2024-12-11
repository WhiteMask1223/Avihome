import OffertsFormCheckBox from "./OffertsFormCheckBox";

export default function OffertsFormSelector({ id, offertsFormData, handlerFunction, admits }) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-evenly">

            {Object.entries(offertsFormData[id]).map(([key]) => (
                <OffertsFormCheckBox
                    key={key}
                    objKey={id}
                    subKey={key}
                    value={offertsFormData[id][key]}
                    handlerFunction={handlerFunction}
                    admits={admits}
                />
            ))}

        </div>

    );
}