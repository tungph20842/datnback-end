import express from "express";
import { createComment, getCommentsByProductId, removecomment, updatecomment } from "../controllers/comment";
import { checkPermission } from "../middlewares/checkpermission";
const router = express.Router();
router.get("/comment/:id",getCommentsByProductId)
router.post("/comment",createComment)
router.delete("/comment/:id",checkPermission,removecomment)
router.put("/comment/:id",checkPermission,updatecomment)
export default router