import express from "express";
import { checkPermission } from "../middlewares/checkpermission";
import {
  addNew,
  getAllNews,
  getNewById,
  removeNew,
  updateNew,
} from "../controllers/news.js";

const router = express.Router();

router.get("/news", getAllNews);
router.get("/news/:id", getNewById);
router.delete("/news/:id", removeNew);
router.post("/news", addNew);
router.patch("/news/:id", updateNew);

export default router;
