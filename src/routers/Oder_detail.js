import express from "express"
import { create, get, getAll, remove, update } from "../controllers/Oder_detail"
const router = express.Router();

router.post('/oderDetail', create);
router.get('/oderDetail', getAll);
router.get('/oderDetail/:id', get);
router.put('/oderDetail/:id', update);
router.delete('/oderDetail/:id', remove);

export default router;