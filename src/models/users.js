import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  idUser: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //Thêm regex kiểm tra định dạng email
    match: [/^\S+@\S+\.\S+$/, 'is invalid'],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "member",
  },
  status: {
    type: String,
    default: "on going",
  },
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/dfftwrlu2/image/upload/v1700585307/IMG_0773_tesnhz.jpg",
  },
  confirmationCode: {
    type: String,
  },
});

export default mongoose.model("User", UserSchema);
