import express from "express"
import { create, get, getAll, remove, update } from "../controllers/blog"
const router = express.Router();

router.post('/blog', create);
router.get('/blog', getAll);
router.get('/blog/:id', get);
router.put('/blog/:id', update);
router.delete('/blog/:id', remove);

export default router;