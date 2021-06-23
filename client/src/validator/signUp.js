import Joi from 'joi';

const validateEmail = (email, helpers) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
        return email;
    }
    return helpers.error('email.invalid');
}

export default Joi.object().keys({
    "email": Joi.string().custom(validateEmail).required(),
    "username": Joi.string().min(3).required(),
    "password": Joi.string().min(3).required(),
    "repeatPassword": Joi.ref('password')
});