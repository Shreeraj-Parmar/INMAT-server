import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  company: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
  },
  items: [
    {
      itemName: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      amount: {
        type: String,
      },
    },
  ],
  discount: {
    type: Number,
  },
  totalAmount: {
    type: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
