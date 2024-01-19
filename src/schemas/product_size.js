import joi from "joi"

export const productSizeSchema = joi.object({
    quantity: joi.number().required(),
    productId: joi.string().required(),
    colorId: joi.string().required(),
    sizeId: joi.string().required(),
})