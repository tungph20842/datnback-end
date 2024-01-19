import Joi from "joi";

export const newsSchema = Joi.object({
  _id: Joi.string(),
  new_name: Joi.string().required().messages({
    "string.empty": "Tên tin tức bắt buộc nhập",
    "any.required": "Trường tin tức bắt buộc nhập",
  }),
  new_image: Joi.object().required().messages({
    "any.required": "Trường ảnh tin tức bắt buộc nhập",
  }),
  new_description: Joi.string().required().messages({
    "string.empty": "Mô tả tin tức bắt buộc nhập",
    "any.required": "Trường mô tả bắt buộc nhập",
  }),
});
