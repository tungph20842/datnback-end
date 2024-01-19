import User from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {  changePasswordSchema, siginSchema, signupSchema } from "../schemas/users";
import nodemailer from 'nodemailer';
// import { sendMail2 } from './nodemailer.controller';


export const signup = async (req, res) => {
  try {
      //validate tất cả các trường trước 
      const { error } = signupSchema.validate(req.body, { abortEarly: false });
      //nếu có lỗi tạo ra một cái mảng mới chứa tất cả các mesage này
      if (error) {
          const errors = error.details.map((err) => err.message);
          //trả về phía client
          return res.status(400).json({
              message: errors,
          });
      }
      // Kiểm tra xem user đã đk chưa?
    //   const userExist = await User.findOne({ email: req.body.email });
    //   //nếu đăng kí rồi thông báo trả ra cho client
    //   if (userExist) {
    //       return res.status(400).json({
    //           message: "Email đã tồn tại",
    //       });
    //   }
      //nếu chưa đăng kí chúng ta mã hóa mật khẩu bằng bcrypt
      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      //tạo một use mới chứa thông tin name,email từ phía client gửi lên 
      //có phần password sẽ lấy hashedpassword gắn vào 
      const user = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          avatar: "https://res.cloudinary.com/dfftwrlu2/image/upload/v1700585307/IMG_0773_tesnhz.jpg",
          status: "on going"

      });

      // Tạo token
      const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1d" });
      //sau khi tạo user xong trả về client và không bao gồm phần password
      // không trả về password
      user.password = undefined;

      return res.status(201).json({
          message: "Tạo tài khoản thành công",
          accessToken: token,
          user,
      });
  } catch (error) {
      return res.status(400).json({
          message: error,
      });
  }
};
//đăng nhập
export const signin = async (req, res) => {
  try {
      const { email, password } = req.body
      const { error } = siginSchema.validate(req.body, { abortEarly: false });
      if (error) {
          return res.status(400).json({
              message: error.details.map((err) => err.message)
          })
      }
      //kiem tra xem user da dang ki chua 
      const user = await User.findOne({ email })
      if (!user) {
          return res.status.json({
              message: "email không tồn tại"
          })
      }
      // so sánh mật khẩu
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
          return res.status(400).json({
              message: "mật khẩu không đúng"
          })
      }

      const token = jwt.sign({ id: user._id,username:user.username,email:user.email }, "123456", { expiresIn: "1d" })

      user.password = undefined
      return res.status(200).json({
          message: "dang nhap thanh cong",
          accessToken: token,
          user
      })



  } catch (error) {

      return res.status(400).json({
          message: error
      })

  }

}


export const getUser = async (req, res) => {
  try {
      const data = await User.find()
      return res.json(data);
  } catch (err) {
      return res.send({
          message: err
      })
  }
}

export const getUserById = async (req, res) => {
  try{
  const id = req.params.id
  const data = await User.findById(id)
  return res.json(data);
  } catch(err){
    return res.send({
      message: err
  })
}
}

export const removeUser = async (req, res) => {
  try {
    
      const data = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
          message: "Người dùng đã được xóa thành công",
          data,
      });
  } catch (error) {
      return res.status(500).json({
          message: error,
      });
  }
};
export const changePassword = async (req, res) => {
  try {
    const { error } = changePasswordSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.findById(req.params.id)
    if(!user){
      return res.status(404).json({
        message: "User not found",
      })
    }
    const isPasswordValid = await bcrypt.compare(req.body.currentPassword,user.password)
    if(!isPasswordValid){
      return res.status(404).json({
        message: "Current password is incorrect",
    })
  }
  const hashedNewPassword = await bcrypt.hash(req.body.newPassword,10)
  user.password = hashedNewPassword
  await user.save()
  return res.status(200).json({
    message: "Password changed successfully",
  })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
export const updateUser = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng",
      });
    }
    return res.status(200).json({
      message: "Người dùng đã được cập nhật thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'dasuabest@gmail.com',
      pass: 'qcgsbmwlkzrmvjzt',

  },
  tls: {
      rejectUnauthorized: false,
  },
});

export const sendMail2 = async (data) => {
  const { confirmationCode } = data; // Lấy giá trị confirmationCode từ data

  const mainOptions = {
      from: data.fullname,
      to: data.email,
      subject: 'Cảm ơn bạn đã liên hệ',
      text: `Xin chào ${data.fullname},\n\nCảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ xem xét và trả lời sớm nhất có thể.\n\nTrân trọng,\nĐội ngũ hỗ trợ`,
      html: `Mã xác nhận của bạn là: ${confirmationCode}`,
  };

  await transporter.sendMail(mainOptions);
};
export const forgotPassword = async (req, res) => {
  try {      // Kiểm tra xem user đã đăng ký chưa
      const user = await User.findOne({email: req.body.email});
      console.log(user)
      if (!user) {
          return res.status(400).json({
              message: 'Email không tồn tại'
          });
      }

      // Tạo mã xác nhận ngẫu nhiên
      const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Lưu mã xác nhận vào user
      user.confirmationCode = confirmationCode;
      await user.save();

      // Gửi mã xác nhận qua email bằng sendMail2
      await sendMail2({
          fullname: user.fullname,
          email: user.email,
          confirmationCode: confirmationCode, // Thêm confirmationCode vào data
          // Thêm các thông tin khác nếu cần thiết
      });

      return res.status(200).json({
          message: 'Mã xác nhận đã được gửi qua email'
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          message: 'Có lỗi xảy ra'
      });
  }
};
// Trong file users.js (hoặc nơi bạn xử lý logic đăng ký)




export const resetPassword = async (req, res) => {
  try {
    const { email, confirmationCode, newPassword } = req.body;

    // Kiểm tra xác nhận mã và lấy thông tin người dùng
    const data = await User.findOne({ email, confirmationCode });

    console.log("User: ", data); // In ra thông tin người dùng để kiểm tra
    if (!data) {
      return res.status(400).json({ message: 'Mã xác nhận không hợp lệ' });
    }

    // Hash mật khẩu mới trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    data.password = hashedPassword;

    // Lưu thông tin người dùng với mật khẩu mới
    await data.save();

    return res.status(200).json({ message: 'Mật khẩu đã được đặt lại thành công' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Có lỗi xảy ra khi đặt lại mật khẩu' });
  }
};
