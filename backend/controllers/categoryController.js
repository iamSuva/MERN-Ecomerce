import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const addCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        if(!name)
        {
            return res.status(401).send({message:"cat name is required"});
        }
        const existcat=await categoryModel.findOne({name});
        if(existcat)
        {
            return res.status(200).send({
                success:true,
                message:"Already exist"
            })
        }
        const category=await new categoryModel({name,slug:slugify(name)}).save();
        
        return res.status(200).send({
            success:true,
            message:"new category is added",
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in category",
            error
        })
    }
}

export const updateCategory=async(req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;
        const updatedCategory=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        return res.status(200).send({
            success:true,
            message:" category is updateded",
            updatedCategory
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in category updation",
            error
        })
    }
}

//get all
export const getAllcategory=async(req,res)=>{
    try {
        const allcategory=await categoryModel.find({});
        return res.status(200).send({
            success:true,
            message:"all category",
           allcategory
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in getting all category ",
            error
        })
        
    }
}
//single cat
export const getsingleCategory=async(req,res)=>{
    try {
        const {catname}=req.params;
        const category=await categoryModel.findOne({slug:catname});
        return res.status(200).send({
            success:true,
            message:"single category",
           category
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in category finding",
            error
        })
        
    }
}

//delete category


export const deleteCategory=async(req,res)=>{
    try {
        const {id}=req.params;
        const category=await categoryModel.findByIdAndDelete(id);
        return res.status(200).send({
            success:true,
            message:"category is deleted",
           category
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in category deleting",
            error
        })
        
    }
}