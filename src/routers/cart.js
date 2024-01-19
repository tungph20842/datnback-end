import express from "express"
import { create, get, getAll, remove, update } from "../controllers/cart"
const router = express.Router();

router.post('/cart', create);
router.get('/cart', getAll);
router.get('/cart/:id', get);
router.put('/cart/:id', update);
router.delete('/cart/:id', remove);

export default router;