import express from "express";
import { isAdmin, requireSign } from "../middleware/authorization.js";
import {
  addCategoryController,
  getAllcategory,
  getsingleCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
const router = express.Router();

//get all
router.get("/get-allcategory", getAllcategory);
//single category
router.get("/get-category/:catname", getsingleCategory);
//update
router.post("/add-category", requireSign, isAdmin, addCategoryController);
//update
router.put("/update-category/:id", requireSign, isAdmin, updateCategory);
//delete
router.delete("/delete-category/:id", requireSign, isAdmin, deleteCategory);

export default router;
