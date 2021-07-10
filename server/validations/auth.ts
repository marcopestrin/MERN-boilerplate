import Joi from "joi";

const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required()
    })
};

const requestNewToken = {
    headers: Joi.object().keys({
        refreshtoken: Joi.string().required()
    }).unknown(true)
};

const login = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
};

const recoveryPassword = {
    body: Joi.object().keys({
        password: Joi.string().required(),
        resetToken: Joi.string().required()
    })
};

const reset = {
    body: Joi.object().keys({
        email: Joi.string().required()
    })
};

export default {
    logout,
    requestNewToken,
    login,
    recoveryPassword,
    reset
}