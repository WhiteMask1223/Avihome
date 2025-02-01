import Asterisk from "@/components/UI/formElements/Asterisk";
import VariableInput from "@/components/UI/formElements/VariableInput";

export default function SignUpInput({
    children,
    id,
    tittle, 
    inputType,
    value,
    setStateFunction,
    error,
    required,
    ...props
}) {
    return (
        <div className="mt-3">
            <label htmlFor={id} className="flex font-bold">
                {tittle} {required?<Asterisk />:""}
            </label>
            <VariableInput
                type={inputType}
                id={id}
                value={value}
                setStateFunction={setStateFunction}
                autoComplete={"off"}
                error={error}
                required={required}
                {...props}
            />
            {children}
        </div>
    );
};