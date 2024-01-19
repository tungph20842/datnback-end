
import comment from '../models/comment';
import { CommentSchema } from '../schemas/comment';

export const createComment = async (req, res) => {
    try {
        const { error } = CommentSchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            })
        }
        const comments = await comment.create(req.body)

        return res.status(201).json({
            message: "Bình luận thành công",
            comments,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi",
            error: error.message
        })
    }
}
export const getCommentsByProductId = async (req, res) => {
    try {
        const comments = await comment.find({ productId: req.params.id }).populate({
            path: 'userId',
            select: 'username avatar',
        }).exec()
        return res.status(200).json({
            comments,

        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi",
            error: error.message
        })
    }
}
export const removecomment = async (req, res) => {
    try {
        const comments = await comment.findByIdAndDelete(req.params.id)
        return res.status(201).json({
            message: "Xóa Thành Công",
            comments
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
export const updatecomment = async (req, res) => {
    try {
        const comments = await comment.findOneAndUpdate({ _id: req.params.id }, req.body)
        return res.status(201).json({
            message: "Cập Nhật Thành Công",
            comments
        })
    } catch (error) {
        return res.status(401).json({
            message: error
        })
    }
}