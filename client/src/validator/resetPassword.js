import Joi from "joi";
import { validateEmail } from "./index";

export default Joi.object().keys({
    "email": Joi.string().custom(validateEmail).required()
});