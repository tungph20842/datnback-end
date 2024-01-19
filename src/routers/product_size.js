import { create, get, getAll, remove, update } from "../controllers/product_size"
import express from "express";
const router = express.Router();

router.post('/productSize', create);
router.get('/productSize', getAll);
router.get('/productSize/:id', get);
router.put('/productSize/:id', update);
router.delete('/productSize/:id', remove);

export default router;