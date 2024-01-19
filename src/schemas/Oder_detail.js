import joi from "joi"

export const oderDetailSchema = joi.object({
    quantity: joi.number().required(),
    price: joi.number().required(),
    productId: joi.string().required(),
    colorId: joi.string().required(),
    sizeId: joi.string().required(),
    orderId: joi.string().required(),
})