import express from "express";
import { isAdmin, requireSign } from "../middleware/authorization.js";
import {
  addProduct,  
  allOrdersControllers,  
  braintreePaymentController,
  braintreePaymentToken,
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
import formidable from "express-formidable";
const router = express.Router();
//add product
router.post("/add-product", requireSign, isAdmin, formidable(), addProduct);
router.get("/get-allproducts", getAllProduct);
router.get("/get-product/:name", getSingleProduct);
router.get("/get-productImage/:id", getProductImage);
router.delete("/delete-product/:id", deleteProduct);
router.put("/update-product/:id", formidable(), updateProduct);
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
