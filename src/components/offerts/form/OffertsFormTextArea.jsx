import VariableTextArea from "@/components/UI/formElements/VariableTextArea";
import Asterisk from "@/components/UI/formElements/Asterisk";

export default function OffertsFormTextArea({ children, label, id, value, handlerFunction, error, textAreaSize, placeholder }) {
    return (
        <div className="mt-5">
            <label htmlFor={id} className="flex text-lg font-bold">
                {label} <Asterisk />
            </label>

            {children ?
                <div className="mt-2 lg:flex lg:justify-between">

                    {children}

                    <VariableTextArea
                        id={id}
                        value={value}
                        setStateFunction={handlerFunction}
                        error={error[0]}
                        cols={textAreaSize[0]}
                        rows={textAreaSize[1]}
                        placeholder={placeholder}
                        autoComplete={"off"}
                    />
                </div>
                :
                <VariableTextArea
                    id={id}
                    value={value}
                    setStateFunction={handlerFunction}
                    error={error[0]}
                    cols={textAreaSize[0]}
                    rows={textAreaSize[1]}
                    placeholder={placeholder}
                />
            }
        </div>
    );
};