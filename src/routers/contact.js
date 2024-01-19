import express from "express"
import { createContact,createContactNoUserId, get, getAll, remove, updateContactStatus } from "../controllers/contact"
const router = express.Router();

router.post('/contact', createContact);
router.post('/contactNoId', createContactNoUserId);
router.get('/contact', getAll);
router.get('/contact/:id', get);
router.put('/contact/:id', updateContactStatus);
router.delete('/contact/:id', remove);

export default router;