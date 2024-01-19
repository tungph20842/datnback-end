import { Vnpay } from '../controllers/vnpay';
import express from 'express';

const router = express.Router();

router.post('/createVnpay', Vnpay);

export default router;
