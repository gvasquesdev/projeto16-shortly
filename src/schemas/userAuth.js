import joi from "joi";

export const signupSchema = joi.object({
    name: joi.string.min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}')).required(),
    confirmPassword: joi.ref('password')
});

export const signinSchema = joi.object({

    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}')).required()
});

