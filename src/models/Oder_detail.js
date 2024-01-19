import mongoose from "mongoose";

const oderDetailSchema = new mongoose.Schema({
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    orderId: {
        type: mongoose.Types.ObjectId, ref: "Order"
    },
    productId: {
        type: mongoose.Types.ObjectId, ref: "Product"
    },
    sizeId: {
        type: mongoose.Types.ObjectId, ref: "Size"
    },
    colorId: {
        type: mongoose.Types.ObjectId, ref: "Color"
    },
    voucherId: {
        type: mongoose.Types.ObjectId, ref: "Voucher"
    },

}, { timestamps: true, versionKey: false })
export default mongoose.model("OderDetail", oderDetailSchema)