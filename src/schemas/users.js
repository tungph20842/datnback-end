import joi from "joi";

export const signupSchema = joi.object({
  username: joi.string().required().messages({
      "string.empty": "Tên không được để trống",
      "any.required": "Trường tên là bắt buộc",
  }),
  email: joi.string().email().required().messages({
      "string.empty": "Email không được để trống",
      "any.required": "Trường email là bắt buộc",
  }),
  password: joi.string().required().min(6).messages({
      "string.empty": "Mật khẩu không được để trống",
      "any.require": "Trường mật khẩu là bắt buộc",
  }),
  confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
      "string.empty": "Xác nhận mật khẩu không được để trống",
      "any.only": "Xác nhận mật khẩu không khớp",
      "any.required": "Trường xác nhận mật khẩu là bắt buộc",
  }),
});

export const siginSchema = joi.object({

  email: joi.string().email().required().messages({
      "string.empty": "Email không được để trống",
      "any.required": "Trường email là bắt buộc",
  }),
  password: joi.string().required().messages({
      "string.empty": "Mật khẩu không được để trống",
      "any.require": "Trường mật khẩu là bắt buộc",
  }),

});
export const changePasswordSchema = joi.object({
    currentPassword: joi.string().required().min(6),
    newPassword: joi.string().required().min(6),
    confirmPassword: joi.string().required().valid(joi.ref('newPassword')),
  });
