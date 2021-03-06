import Joi from "joi";
import { validateEmail } from "./index";

export default Joi.object().keys({
    "email": Joi.string().custom(validateEmail).required(),
    "username": Joi.string().min(3).required(),
    "password": Joi.string().min(3).required(),
    "repeatPassword": Joi.ref('password')
});