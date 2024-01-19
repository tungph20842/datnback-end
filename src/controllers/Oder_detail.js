
import OderDetail from "../models/Oder_detail"
import Color from "../models/color";
import Size from "../models/size"
import Product from "../models/product"

import { oderDetailSchema } from "../schemas/Oder_detail"
export const getAll = async (req, res) => {
    try {
        const oderDetails = await OderDetail.find();
        return res.json( oderDetails)

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const get = async (req, res) => {
    try {
        const  oderDetail = await OderDetail.findById(req.params.id).populate('colorId').populate('sizeId').populate('productId');
        return res.json(oderDetail)
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const create = async (req, res) => {
    try {
        const { error } = oderDetailSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            })
        }
        const oderDetail = await OderDetail.create(req.body);
        return res.status(201).json(oderDetail)

        await Color.findOneAndUpdate(oderDetail.colorId, {
            $addToSet: {
                oderDetail: oderDetail._id
            }
        })
        await Size.findOneAndUpdate(oderDetail.sizeId, {
            $addToSet: {
                oderDetail: oderDetail._id
            }
        }),
        await Product.findOneAndUpdate(oderDetail.productId, {
            $addToSet: {
                oderDetail: oderDetail._id
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
        const oderDetail = await OderDetail.findByIdAndDelete(req.params.id);
        return res.json({
            message: "xóa thành công",
            oderDetail,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const update = async (req, res) => {
    try {
        const oderDetail = await OderDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json({
            oderDetail,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}