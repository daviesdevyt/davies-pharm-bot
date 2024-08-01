import mongoose, { Schema } from "mongoose";

// Define the Product schema
const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

// Define the Category schema
const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

// Create models

const userSchema = new Schema({
  _id: String,
});


const orderSchema = new Schema({
  user: { type: Schema.Types.String, ref: 'User' },
  total: Number,
  products: []
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
