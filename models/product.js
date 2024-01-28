const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new mongoose.Schema({
  prdid: {
    type: Number,
    required: true,
  },
  prdname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
    remarks: {
    type: String,
  },
    updated: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
