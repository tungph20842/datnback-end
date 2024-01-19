import express from "express";
import {
  createVoucher,
  getVouchers,
  getVoucherByID,
  updateVoucher,
  deleteVoucher,
} from "../controllers/voucher";

const router = express.Router();

router.post("/vouchers", createVoucher);

router.get("/vouchers", getVouchers);

router.get("/vouchers/:id", getVoucherByID);

router.put("/vouchers/:id", updateVoucher);

router.delete("/vouchers/:id", deleteVoucher);

export default router;
