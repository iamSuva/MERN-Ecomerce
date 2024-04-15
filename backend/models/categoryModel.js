import mongoose, { Mongoose, Schema } from "mongoose";

const categorySchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        lowercase:true
    }   
})

const categoryModel=new mongoose.model("category",categorySchema);
export default categoryModel;