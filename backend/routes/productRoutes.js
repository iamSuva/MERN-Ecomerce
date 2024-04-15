import express from "express";
import { isAdmin, requireSign } from "../middleware/authorization.js";
import multer from "multer";
import {
  addProduct,  
  allOrdersControllers,  
  
  deleteProduct,
  filterProductController,
  getAllProduct,
  getProductImage,
  getSingleProduct,
  ordersController,
  placeOrderController,
  productCountController,
  productPagination,
  productSearchController,
  productsByCategoryController,
  similarProductController,
  updateProduct,
} from "../controllers/productController.js";
const router = express.Router();
//add product
import formidable from "express-formidable";
// router.post("/add-product", requireSign, isAdmin, formidable(), addProduct);

//create a multer store
import path from "path";
const storage=multer.diskStorage({

  destination:(req,file,cb)=>{
    console.log("folder multer")
    // console.log(path.resolve("./public/uploads/products"));
      cb(null,"public/uploads/products")
  },
  filename:(req,file,cb)=>{
    const imagepath=`${Date.now()}-${file.originalname}`;
    cb(null,imagepath);
  }

})
const upload=multer({storage:storage});
router.post("/add-product", requireSign, isAdmin, upload.single("productImage"), addProduct); //with the help of multer

router.get("/get-allproducts", getAllProduct);
router.get("/get-product/:name", getSingleProduct);
router.get("/get-productImage/:id", getProductImage);
router.delete("/delete-product/:id", deleteProduct);
router.put("/update-product/:id", upload.single("productImage"), updateProduct);
router.post("/get-filters", filterProductController);
router.get("/product-count",productCountController);
router.get("/product-page/:page",productPagination);
router.get("/product-search/:keyword",productSearchController);
router.get("/similar-products/:catid/:pid",similarProductController);
router.get("/product-bycategory/:slug",productsByCategoryController);

//payments
// router.get("/braintree/token",braintreePaymentToken);
// router.post("/braintree/payment",requireSign,braintreePaymentController)

router.post("/placeOrder",placeOrderController);

router.get("/get-orders",requireSign,ordersController);
router.get("/get-allorders",allOrdersControllers);
export default router;
