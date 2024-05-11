import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId, ref: "product",required:true 
      }
       
    ],

    payment: {
      totalAmount: Number,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    userName: String,
    mobileNumber: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    status: {
      type: String,
      default: "Not process",
      enum: ["Not process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
