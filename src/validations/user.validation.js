export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const phoneNumberValidator = (phone) => {
    const regEx = /^\d{4}-\d{7}$/
    return regEx.test(phone)
};

export const validateSignUpData = (registrationData, setterFunction, setError) => {
    if (!validateEmail(registrationData.email)) {
        setError([true, 'Ingrese un correo válido.']);
        setterFunction("email", '');
        return false
    };

    if (registrationData.password.length < 8) {
        setError([true, 'La contraseña debe tener mas de 8 caracteres.']);
        setterFunction("password", '');
        setterFunction("passwordRepeat", '');
        return false
    };

    if (registrationData.password !== registrationData.passwordRepeat) {
        setError([true, 'Las contraseñas no coinciden.']);
        setterFunction("password", '');
        setterFunction("passwordRepeat", '');
        return false
    };

    if (!phoneNumberValidator(registrationData.phone)) {
        setError([true, 'Ingrese un número de teléfono válido.']);
        setterFunction("phone", '');
        return false
    };

    return true
};