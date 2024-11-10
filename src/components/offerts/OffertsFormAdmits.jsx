import { set } from "mongoose";
import { ASIDE_STYLES } from "../mainPage/aside/asideStyles";

export default function OffertsFormAdmits({ offertsFormData, setOffertsFormData }) {

    const handleRadioChange = (e) => {
        const { name } = e.target;

        setOffertsFormData((prevFormData) => ({
            ...prevFormData,
            admits: {
                'Solo Hombres': name === 'Solo Hombres',
                'Solo Mujeres': name === 'Solo Mujeres',
                'Cualquiera': name === 'Cualquiera'
            }
        }))
    }


    return (
        <div className="sm:flex justify-between">
            <label className={ASIDE_STYLES.ITEM_LABEL}>
                <input
                    className="hidden peer"
                    name="Solo Hombres"
                    type="radio"
                    onChange={(e) => handleRadioChange(e)}
                    checked={offertsFormData.admits['Solo Hombres']}
                />
                <span className={ASIDE_STYLES.CHECKBOX}></span>
                <span className={ASIDE_STYLES.ITEM_TEXT}>Solo Hombres</span>
            </label>

            <label className={ASIDE_STYLES.ITEM_LABEL}>
                <input
                    className="hidden peer"
                    name="Solo Mujeres"
                    type="radio"
                    onChange={(e) => handleRadioChange(e)}
                    checked={offertsFormData.admits['Solo Mujeres']}
                />
                <span className={ASIDE_STYLES.CHECKBOX}></span>
                <span className={ASIDE_STYLES.ITEM_TEXT}>Solo Mujeres</span>
            </label>

            <label className={ASIDE_STYLES.ITEM_LABEL}>
                <input
                    className="hidden peer"
                    name="Cualquiera"
                    type="radio"
                    onChange={(e) => handleRadioChange(e)}
                    checked={offertsFormData.admits.Cualquiera}
                />
                <span className={ASIDE_STYLES.CHECKBOX}></span>
                <span className={ASIDE_STYLES.ITEM_TEXT}>Cualquiera</span>
            </label>
        </div>

    );
}