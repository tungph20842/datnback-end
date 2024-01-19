import express from "express"
import { create, get, getAll, remove, update } from "../controllers/size"
const router = express.Router();

router.post('/size', create);
router.get('/size', getAll);
router.get('/size/:id', get);
router.put('/size/:id', update);
router.delete('/size/:id', remove);

export default router;