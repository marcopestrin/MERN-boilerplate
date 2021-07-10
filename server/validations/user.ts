import Joi from "joi";

const confirmEmail = {
    path: Joi.object().keys({
        activeCode: Joi.string().required()
    })
};

const createNewUser = {
    body: Joi.object().keys({
        password: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().required()
    })
};

const getUserById = {
    query: Joi.object().keys({
        id: Joi.string().required()
    })
};

const toggleActiveUser = {
    query: Joi.object().keys({
        id: Joi.string().required()
    })
};

const deleteUser = {
    query: Joi.object().keys({
        id: Joi.string().required()
    })
};

const updateUser = {
    body: Joi.object().keys({
        password: Joi.string(),
        username: Joi.string().required(),
        email: Joi.string().required()
    }).unknown(true),
    query: Joi.object().keys({
        id: Joi.string().required()
    })
};

export default {
    confirmEmail,
    createNewUser,
    getUserById,
    toggleActiveUser,
    deleteUser,
    updateUser
}