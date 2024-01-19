import joi from "joi"

export const colorSchema = joi.object({
    name: joi.string().required(),
})