
import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    img: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    date:{
        type: String
    }
}, { timestamps: true, versionKey: false })
export default mongoose.model("Blog", blogSchema)