import Blog from "../models/blog";
import { blogSchema } from "../schemas/blog"; 

export const getAll = async (req, res) => {
    try {
        const blog = await Blog.find();
        return res.json(blog)

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Blog.findById(id)
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
        const { error } = blogSchema.validate(body);
        if (error) {
            return res.json({
                message: error.details[0].message,
            });
        }
        const data = await Blog.create(body);
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
        const blog = await Blog.findByIdAndDelete(req.params.id);
        return res.json({
            message: "xóa thành công",
            blog,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const update = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json({
            blog,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}