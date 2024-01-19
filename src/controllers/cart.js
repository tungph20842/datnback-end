
import Cart from "../models/cart"
import Color from "../models/color";
import Size from "../models/size"
import { cartSchema } from "../schemas/cart"
export const getAll = async (req, res) => {
    try {
        const cart = await Cart.find();
        return res.json(cart)

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const get = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id).populate('colorId').populate('sizeId');
        return res.json(cart)
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const create = async (req, res) => {
    try {
        const { error } = cartSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            })
        }
        const cart = await Cart.create(req.body);
        return res.status(201).json(cart)

        await Color.findOneAndUpdate(cart.colorId, {
            $addToSet: {
                cart: cart._id
            }
        })
        await Size.findOneAndUpdate(cart.sizeId, {
            $addToSet: {
                cart: cart._id
            }
        })


    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const remove = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        return res.json({
            message: "xóa thành công",
            cart,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const update = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json({
            cart,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}