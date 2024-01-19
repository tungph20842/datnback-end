import mongoose from "mongoose"

const productSizeSchema = new mongoose.Schema({
    
    productId: {
        type: mongoose.Types.ObjectId, ref: "Product"
    },
    quantity: {
        type: Number
    },
    colorId: {
        type: mongoose.Types.ObjectId, ref: "Color"
    },
    sizeId: {
        type: mongoose.Types.ObjectId, ref: "Size"
    }
}, { timestamps: true, versionKey: false })
export default mongoose.model("productSize", productSizeSchema)