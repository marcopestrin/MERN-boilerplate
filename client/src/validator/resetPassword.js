import Joi from "joi";

export default Joi.object().keys({
    "password": Joi.string().min(3).required(),
    "repeatPassword": Joi.ref('password')
});