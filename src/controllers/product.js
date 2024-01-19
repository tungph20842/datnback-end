import Joi from "joi";
import Product from "../models/product";

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    img : Joi.array().required(),
    sizeAndcolor: Joi.array().required(),
    description: Joi.string().required(),
    categoryId : Joi.string().required(),
});

export const getAll = async (req, res) => {
    const options = {
        limit : 10,
        sort: {
            [req.query._sort ] : req.query._order === "desc" ? - 1 : 1,
        },
    }
    try {
        const data = await Product.find();

        if (data.length == 0) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(data);
    } catch (error) {}
};
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Product.findById(id)
        return res.json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
export const create = async (req, res) => {
    try {
        const body = req.body;
        console.log(body,"12312");
        const { error } = productSchema.validate(body);
        if (error) {
            return res.json({
                message: error.details[0].message,
            });
        }
        const data = await Product.create(body);
        if (data.length === 0) {
            return res.status(400).json({
                message: "Thêm sản phẩm thất bại",
            });
        }
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const remove = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const update = async (req, res) => {
    try {
        const { sizeAndcolor, ...updateData } = req.body;
        if (sizeAndcolor) {
            updateData.sizeAndcolor = sizeAndcolor;
        }
        const data = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật sản phẩm thất bại",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
