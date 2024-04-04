import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:true
    },
    productImage:{
    //    data:Buffer,
    //    contentType:String
      type:String,
      required:true
    }
    


},{timestamps:true});
const productModel=new mongoose.model("product",productSchema);
export default productModel;