import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		productId: {
			type: mongoose.Types.ObjectId,
			ref: 'products',
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);
export default mongoose.model('comment', commentSchema);
