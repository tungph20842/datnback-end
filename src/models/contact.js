
import mongoose from "mongoose";
export const ContactStatus = {
	CHUATUVAN: 'CHUATUVAN',
	DATUVAN: 'DATUVAN',
};
const contactSchema = new mongoose.Schema({
    userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
    name: {
        type: String,
		required: true,
    },
    email: {
        type: String,
		required: true,
    },
    phonenumber: {
        type: String,
		required: true,

    },
    description: {
        type: String,
        required: true,
    },
    traloi:{
        type: String,
    },
    status: {
        type: String,
        default:ContactStatus.CHUATUVAN,
    }

});
export default mongoose.model('Contact', contactSchema)