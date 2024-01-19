import News from "../models/news.js";
import { newsSchema } from "../schemas/news.js";

export const getAllNews = async (req, res) => {
  const {
    _limit = 10,
    _sort = "createAt",
    _order = "asc",
    _page = 1,
    q,
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order == "desc" ? -1 : 1,
    },
  };

  const searchQuery = q ? { name: { $regex: q, $options: "i" } } : {};
  try {
    const news = await News.paginate(searchQuery, options);
    if (news.docs.length === 0) {
      return res.status(404).json({
        message: "Không có tin tức nào!",
      });
    }
    return res.status(200).json({
      message: "Lấy tất cả tin tức thành công!",
      news,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const getNewById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news || news.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy tin tức",
      });
    }
    return res.status(200).json({
      message: "Lấy tin tức thành công",
      news,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
// export const removeForce = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const news = await News.deleteById(id);
//     return res.status(200).json({
//       message: "Xoá tin tức vĩnh viễn.!",
//       news,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: error,
//     });
//   }
// };

export const removeNew = async (req, res) => {
  try {
    const news = await News.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      message: "Xoá tin tức thành công",
      news,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const addNew = async (req, res) => {
  try {
    const { new_name } = req.body;
    const formData = req.body;
    const data = await News.findOne({ new_name });
    if (data) {
      return res.status(400).json({
        message: "Tin tức đã tồn tại",
      });
    }
    const { error } = newsSchema.validate(formData, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const news = await News.create(formData);
    if (!news || news.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy tin tức",
      });
    }
    return res.status(200).json({
      message: "Thêm tin tức thành công",
      news,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const updateNew = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const { new_name } = body;
    const { error } = newsSchema.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const data = await News.findOne({ new_name, _id: { $ne: id } });
    if (data) {
      return res.status(400).json({
        message: "Tin tức đã tồn tại",
      });
    }
    const news = await News.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!news || news.length === 0) {
      return res.status(400).json({
        message: "Cập nhật tin tức thất bại",
      });
    }
    return res.status(200).json({
      message: "Cập nhật tin tức thành công",
      news,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
