import productSize from "../models/product_size"
import { productSizeSchema } from "../schemas/product_size"

export const getAll = async (req, res) => {
    try {
        const sizes = await productSize.find();
        return res.json(sizes)

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const get = async (req, res) => {
    try {
        const size = await productSize.findById(req.params.id).populate('productId').populate('sizeId').populate('colorId');
        return res.json(size)
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const create = async (req, res) => {
    try {
        const { error } = productSizeSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            })
        }
        const size = await productSize.create(req.body);
        return res.status(201).json(size)
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const remove = async (req, res) => {
    try {
        const size = await productSize.findByIdAndDelete(req.params.id);
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
        const size = await productSize.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json({
            size,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}