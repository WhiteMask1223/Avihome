import SelectOption from "@/components/UI/formElements/SelectOption";

export default function OffertsFormDropList({ selectKey, value, obj, handlerFunction, error }) {
    return (
        <select
            className={`h-10 w-full sm:w-fit px-2 mt-1 rounded-md bg-elementThemeColor overflow-hidden text-ellipsis whitespace-nowrap ${error[0] ? "ring-2 ring-red-500 focus:ring" : "focus:ring-[#10c4b6]"}`}
            value={value}
            onChange={(e) => handlerFunction(selectKey, e.target.value)}
        >

            <option value="" className="text-grayFontThemeColor" disabled>Seleccione una opción:</option>

            {Object.entries(obj).map(([key]) => (
                <SelectOption key={key} value={key} text={key} />
            ))}

        </select>
    );
};