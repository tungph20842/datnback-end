import express  from "express";
import { searchBlogName, searchProductName } from "../controllers/search";
const router = express.Router();
router.get("/search/product",searchProductName)
router.get("/search/blog",searchBlogName)

export default router