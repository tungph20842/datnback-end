import Contact from "../models/contact"
import { contactSchema } from "../schemas/contact";
import nodemailer from 'nodemailer';
import { sendMail1 } from './nodemailer.controller';
export const getAll = async (req, res) => {
    try {
        const contact = await Contact.find();
        return res.json(contact)

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const get = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        return res.json(contact)
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const createContact = async (req, res) => {
    try {
        const { error } = contactSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            })
        }
        const { userId, name, phonenumber, email, description } = req.body;
        const newContact = new Contact({
            userId, 
            name,
            phonenumber,
            email, 
            description});
              await newContact.save();
    await sendMail1(newContact);

             res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
}
export const createContactNoUserId = async (req, res) => {
    try {
        const { name, phonenumber, email, description } = req.body;
        const newContact = new Contact({
            name,
            phonenumber,
            email, 
            description});
              await newContact.save();
    await sendMail1(newContact);

             res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
}
export const remove = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        return res.json({
            message: "xóa thành công",
            contact,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const updateContactStatus = async (req, res) => {
    try {
      const updateContact = await Contact.findById(req.params.id);
      if (!updateContact) {
        return res.status(400).json({
          error: "Liên hệ không tồn tại",
        });
      }
      if (
        updateContact.status === "CHUATUVAN" ||
        updateContact.status === "DATUVAN" 
      ) {
        const updatedContact = await Contact.findByIdAndUpdate(
          req.params.id,
          req.body,
          { status: req.body.status },
          { new: true }
        );
      await sendMail1(updatedContact);

        res.json(updatedContact);
      } else {
        return res.status(400).json({
          error: "Không thể cập nhật liên hệ ở trạng thái này",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  