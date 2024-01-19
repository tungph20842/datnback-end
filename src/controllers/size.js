import Size from "../models/size"
import { sizeSchema } from "../schemas/size"
export const getAll = async (req, res) => {
    try {
        const sizes = await Size.find();
        return res.json(sizes)

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const get = async (req, res) => {
    try {
        const size = await Size.findById(req.params.id).populate('cart');
        return res.json(size)
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const create = async (req, res) => {
    try {
        const { error } = sizeSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            })
        }
        const size = await Size.create(req.body);
        return res.status(201).json(size)
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const remove = async (req, res) => {
    try {
        const size = await Size.findByIdAndDelete(req.params.id);
        return res.json({
            message: "xóa thành công",
            size,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const update = async (req, res) => {
    try {
        const size = await Size.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json({
            size,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}