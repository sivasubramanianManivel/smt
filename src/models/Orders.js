import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  products: [
    {
      productId: Number,
      name: String,
      quantity: Number,
      rate: Number,
      total: Number,
    }
  ],
  totalAmount: Number, // optional: you can calculate sum of all product totals
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
