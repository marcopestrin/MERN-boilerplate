import Joi from "joi";
import { validateEmail } from "./index";

const passwordSchema = Joi.when("changePasswordEnabled", {
    is: true,
    then: Joi.string().min(3).required()
});

const flagSchema = Joi.boolean().required();

export default Joi.object().keys({
    "username": Joi.string().min(3).required(),
    "email": Joi.string().custom(validateEmail).required(),
    "admin": flagSchema,
    "changePasswordEnabled": flagSchema,
    "currentPassword": passwordSchema,
    "password": passwordSchema,
    "repeatPassword": Joi.string().required().valid(Joi.ref("password"))
});