import joi from "joi"

export const cartSchema = joi.object({
    quantity: joi.number().required(),
    // userId: joi.string().required(),
    // productId: joi.string().required(),
    colorId: joi.string().required(),
    sizeId: joi.string().required(),
    // voucherId: joi.string().required(),
})