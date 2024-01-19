import Voucher from "../models/voucher";
import { voucherSchema } from "../schemas/vouchers";

// Create Voucher
export const createVoucher = async (req, res) => {
  try {
    const body = req.body;
    const { error } = voucherSchema.validate(body);

    if (error) {
      return res.status(400).json({
        message: error.details.map((item) => item.message),
      });
    }

    const voucher = await Voucher.create(body);

    return res.status(201).json({
      message: "Voucher đã được tạo thành công.",
      data: voucher,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateQuantity = async (req, res) => {
  try {
    const voucherId = req.params.id
    const updateQuantity = req.body.quantity
    const updatedVoucher = await Voucher.findOneAndUpdate(
      { id: voucherId },
      { $set: { Quantity: updateQuantity } },
      { new: true }
    );

    if (updatedVoucher) {
      res.status(200).json({ message: 'Voucher quantity updated successfully' });
    } else {
      res.status(404).json({ message: 'Voucher not found' });
    }
  } catch (error) {
    console.error('Error updating voucher quantity:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
// Get Voucher
export const getVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    if (vouchers.length === 0) {
      return res.json({
        message: "Không có voucher nào.",
      });
    }
    return res.status(200).json({
      message: "Lấy tất cả voucher thành công",
      vouchers,
    });
  } catch (error) {
    return res.status(500).json({ error: "Không thể lấy danh sách Voucher." });
  }
};

// getVoucher By ID
export const getVoucherByID = async (req, res) => {
  try {
    const voucherID = req.params.id;

    const voucher = await Voucher.findById(voucherID);

    if (!voucher) {
      return res.status(404).json({ error: "Không tìm thấy Voucher." });
    }

    return res.status(200).json(voucher);
  } catch (error) {
    return res.status(500).json({ error: "Không thể lấy Voucher." });
  }
};

// Update Voucher
export const updateVoucher = async (req, res) => {
  try {
    const voucherID = req.params.id;
    const data = req.body;

    const { error } = voucherSchema.validate(data);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedVoucher = await Voucher.findByIdAndUpdate(voucherID, data, {
      new: true,
    });

    if (!updatedVoucher) {
      return res.status(404).json({ error: "Không tìm thấy Voucher." });
    }

    return res.status(200).json({
      message: "Voucher đã được cập nhật thành công.",
      data: updatedVoucher,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Voucher
export const deleteVoucher = async (req, res) => {
  try {
    const voucherID = req.params.id;

    const deletedVoucher = await Voucher.findByIdAndRemove(voucherID);

    if (!deletedVoucher) {
      return res.status(404).json({ error: "Không tìm thấy Voucher." });
    }

    return res.status(200).json({
      message: "Voucher đã được xóa thành công.",
      data: deletedVoucher,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
