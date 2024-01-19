
import Color from "../models/color"
import { colorSchema } from "../schemas/color"
export const getAll = async (req, res) => {
    try {
        const colors = await Color.find();
        return res.json(colors)

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const get = async (req, res) => {
    try {
        const color = await Color.findById(req.params.id).populate('cart');
        return res.json(color)
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const create = async (req, res) => {
    try {
        const { error } = colorSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            })
        }
        const color = await Color.create(req.body);
        return res.status(201).json(color)
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const remove = async (req, res) => {
    try {
        const color = await Color.findByIdAndDelete(req.params.id);
        return res.json({
            message: "xóa thành công",
            color,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const update = async (req, res) => {
    try {
        const color = await Color.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json({
            color,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}