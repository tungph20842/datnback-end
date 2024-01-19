import mongoose from "mongoose"

const sizeSchema = new mongoose.Schema({
    name: {
        type: String
    }
    ,
    cart: {
        type: mongoose.Types.ObjectId, ref: "Cart"
    },
    product_size: {
        type: mongoose.Types.ObjectId, ref: "Product_size"
    },
    oder_detail: {
        type: mongoose.Types.ObjectId, ref: "Oder_detail"
    }
}, { timestamps: true, versionKey: false })
export default mongoose.model("Size", sizeSchema)