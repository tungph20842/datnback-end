
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    img:[
        {
            url:{
                type: String,
                require:true
            }
        }
    ]
});
export default mongoose.model("Category", categorySchema);