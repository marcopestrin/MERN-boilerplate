const validation = (schema, value) => {
    const options = {};
    return schema.validate(value, options);
}

export const validateEmail = (email, helpers) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
        return email;
    }
    return helpers.error('email.invalid');
}

export default validation;