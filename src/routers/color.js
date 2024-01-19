import express from "express"
import { create, get, getAll, remove, update } from "../controllers/color"
const router = express.Router();

router.post('/color', create);
router.get('/color', getAll);
router.get('/color/:id', get);
router.put('/color/:id', update);
router.delete('/color/:id', remove);

export default router;