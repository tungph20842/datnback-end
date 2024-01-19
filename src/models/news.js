import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const newsSchema = mongoose.Schema(
  {
    new_name: {
      type: String,
      minLength: 3,
      maxlength: 50,
    },
    new_image: {
      type: Object,
      required: true,
    },
    new_description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

newsSchema.plugin(mongoosePaginate);
export default mongoose.model("News", newsSchema);
