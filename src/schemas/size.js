import joi from "joi"

export const sizeSchema = joi.object({
    name: joi.string().required(),
})