import Joi from "joi";

export default Joi.object().keys({
    "username": Joi.string().min(3).required(),
    "password": Joi.string().min(3).required(),
});