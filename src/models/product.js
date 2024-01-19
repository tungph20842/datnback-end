import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: Number,
    price_sale: Number,
    img:  [{
      type: String,
      required: true,
  }],
    sizeAndcolor: [
      {
          sizeId: {
              type: mongoose.Types.ObjectId,
              ref: "Size",
          },
          colorId: {
              type: mongoose.Types.ObjectId,
              ref: "Color",
          },
          quantity: {
              type: Number,
              required: true,
          }
      }

  ],
    description: String,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    }
},
{ timestamps: true, versionKey: false }
);

productSchema.plugin(mongoosePaginate)

export default mongoose.model("Product", productSchema);