import { ASIDE_STYLES } from "../mainPage/aside/asideStyles";

export default function OffertsFormCheckbox({ offertsFormData, handlerFunction }) {
    return (
        <div className="sm:flex justify-between">
            <label className={ASIDE_STYLES.ITEM_LABEL}>
                <input
                    className="hidden peer"
                    type="checkbox"
                    onChange={
                        (e) => handlerFunction('services', 'Agua', e.target.checked)
                    }
                    checked={offertsFormData.services['Agua']}
                />
                <span className={ASIDE_STYLES.CHECKBOX}></span>
                <span className={ASIDE_STYLES.ITEM_TEXT}>Agua</span>
            </label>

            <label className={ASIDE_STYLES.ITEM_LABEL}>
                <input
                    className="hidden peer"
                    type="checkbox"
                    onChange={
                        (e) => handlerFunction('services', 'Aire Acondicionado', e.target.checked)
                    }
                    checked={offertsFormData.services['Aire Acondicionado']}
                />
                <span className={ASIDE_STYLES.CHECKBOX}></span>
                <span className={ASIDE_STYLES.ITEM_TEXT}>Aire Acondicionado</span>
            </label>

            <label className={ASIDE_STYLES.ITEM_LABEL}>
                <input
                    className="hidden peer"
                    type="checkbox"
                    onChange={
                        (e) => handlerFunction('services', 'Electricidad', e.target.checked)
                    }
                    checked={offertsFormData.services['Electricidad']}
                />
                <span className={ASIDE_STYLES.CHECKBOX}></span>
                <span className={ASIDE_STYLES.ITEM_TEXT}>Electricidad</span>
            </label>

            <label className={ASIDE_STYLES.ITEM_LABEL}>
                <input
                    className="hidden peer"
                    type="checkbox"
                    onChange={
                        (e) => handlerFunction('services', 'Gas', e.target.checked)
                    }
                    checked={offertsFormData.services['Gas']}
                />
                <span className={ASIDE_STYLES.CHECKBOX}></span>
                <span className={ASIDE_STYLES.ITEM_TEXT}>Gas</span>
            </label>

            <label className={ASIDE_STYLES.ITEM_LABEL}>
                <input
                    className="hidden peer"
                    type="checkbox"
                    onChange={
                        (e) => handlerFunction('services', 'Internet', e.target.checked)
                    }
                    checked={offertsFormData.services['Internet']}
                />
                <span className={ASIDE_STYLES.CHECKBOX}></span>
                <span className={ASIDE_STYLES.ITEM_TEXT}>Internet</span>
            </label>
        </div>

    );
}