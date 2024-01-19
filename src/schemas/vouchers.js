import Joi from "joi";

export const voucherSchema = Joi.object({
  Voucher_Code: Joi.string().required(),
  Discount_Type: Joi.number().required(),
  Quantity: Joi.number(),
  Start_Date: Joi.date().required(),
  Expiration_Date: Joi.date().required(),
  IsActive: Joi.boolean(),
  Description: Joi.string().max(1000),
})
