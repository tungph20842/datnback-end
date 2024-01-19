import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
  Voucher_Code: {
    type: String,
    required: true,
  },
  Discount_Type: {
    type: Number,
    required: true,
  },
  Quantity: {
    type: Number,
  },
  Start_Date: {
    type: Date,
    required: true,
  },
  Expiration_Date: {
    type: Date,
    required: true,
  },
  IsActive: {
    type: Boolean,
  },
  Description: {
    type: String,
    maxlength: 1000,
  },
});

const Voucher = mongoose.model("Voucher", voucherSchema);

export default Voucher;
