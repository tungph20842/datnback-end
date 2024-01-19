import joi from "joi"

export const CommentSchema = joi.object({
    content: joi.string().required(),
    userId: joi.string().required(),
    productId: joi.string().required(),
})