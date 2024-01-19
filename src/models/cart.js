
import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    quantity: {
        type: Number
    }
    ,
    // userId: {
    //     type: mongoose.Types.ObjectId, ref: "User"
    // },
    // productId: {
    //     type: mongoose.Types.ObjectId, ref: "Product"
    // },

    colorId: {
        type: mongoose.Types.ObjectId, ref: "Color"
    },
    sizeId: {
        type: mongoose.Types.ObjectId, ref: "Size"
    },
    // voucherId: {
    //     type: mongoose.Types.ObjectId, ref: "Voucher"
    // },

}, { timestamps: true, versionKey: false })
export default mongoose.model("Cart", cartSchema)