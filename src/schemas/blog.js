import joi from "joi"

export const blogSchema = joi.object({
    title: joi.string().required(),
    img: joi.string().required(),
    description: joi.string().required(),
    date: joi.string().required(),
})