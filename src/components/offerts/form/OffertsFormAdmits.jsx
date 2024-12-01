import { ASIDE_STYLES } from "../../mainPage/aside/asideStyles";

export default function OffertsFormAdmits({ offertsFormData, setOffertsFormData }) {

    const handleRadioChange = (e) => {
        const { name } = e.target;

        setOffertsFormData((prevFormData) => ({
            ...prevFormData,
            admits: {
                'Caballeros': name === 'Caballeros',
                'Damas': name === 'Damas',
                'Cualquiera': name === 'Cualquiera'
            }
        }))
    }


    return (
        <div className="sm:flex justify-between">
            <label className={ASIDE_STYLES.ITEM_LABEL}>
                <input
                    className="hidden peer"
                    name="Caballeros"
                    type="radio"
                    onChange={(e) => handleRadioChange(e)}
                    checked={offertsFormData.admits['Caballeros']}
                />
                <span className={ASIDE_STYLES.CHECKBOX}></span>
                <span className={ASIDE_STYLES.ITEM_TEXT}>Caballeros</span>
            </label>

            <label className={ASIDE_STYLES.ITEM_LABEL}>
                <input
                    className="hidden peer"
                    name="Damas"
                    type="radio"
                    onChange={(e) => handleRadioChange(e)}
                    checked={offertsFormData.admits['Damas']}
                />
                <span className={ASIDE_STYLES.CHECKBOX}></span>
                <span className={ASIDE_STYLES.ITEM_TEXT}>Damas</span>
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