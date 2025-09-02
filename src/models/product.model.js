import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',   // Assuming the seller is a User
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  product_image: {
    type: String, // Array of image URLs
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

export const Product = new mongoose.model("Product", productSchema);
