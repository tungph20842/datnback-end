import Product from "../models/product"
import blog from "../models/blog"
export const searchProductName = async (req,res)=>{
    const {name}=req.query
    try {
        const searchProduct = await Product.find({name:{$regex:name,$options:"i"}})
        res.json(searchProduct)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"Không tìm được sản phẩm"
        })
        
    }
}
export const searchBlogName = async (req,res)=>{
    const {title}=req.query
    try {
        const searchBlogName = await blog.find({title:{$regex:title,$options:"i"}})
        res.json(searchBlogName)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"Không tìm được blog"
        })
        
    }
}