import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import dotEnv from "dotenv";
dotEnv.config();
import orderModel from "../models/orderModel.js";
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT,
  publicKey: process.env.BRAINTREE_PUBLIC,
  privateKey: process.env.BRAINTREE_PRIVATE,
});

// BRAINTREE_PRIVATE=0b070ef52da0c9a7ec08de2e50746864
// BRAINTREE_PUBLIC=nt4zrwpxrffr6q88
// BRAINTREE_MERCHANT=bxmntbqz5cjzvxjk

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.body;
    console.log("add ", req.body);
    
    const productImage = req.file;
    console.log("product image "+productImage);

    if (!name || !description || !price || !quantity || !category) {
      return res.status(401).send({ message: "Some fields are empty" });
    }

    if (productImage && productImage.size > 1000000) {
      return res
        .status(401)
        .send({ message: "img is required and less than 1mb" });
    }
    const product = new productModel({ ...req.body, slug: slugify(name) });
    // if (productImage) {
    //   product.productImage.data = fs.readFileSync(productImage.path);
    //   product.productImage.contentType = productImage.type;
    // }
    if (productImage) {
      product.productImage = "uploads/products/" + productImage.filename;
    }
    await product.save();
    return res.status(200).send({
      success: true,
      message: "product added",
      product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in add product",
      error,
    });
  }
};

//get products
export const getAllProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productModel
      .find({})
      .populate("category")
      .limit(10)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      total: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in add product",
      error,
    });
  }
};

//single product
export const getSingleProduct = async (req, res) => {
  try {
    const { name } = req.params;
    const product = await productModel
      .findOne({ slug: name })
      .populate("category");
    return res.status(200).send({
      success: true,
      message: "single products",
      product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in add product",
      error,
    });
  }
};
//get product photo
export const getProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id).select("productImage");
    
      return res.status(200).send(product.productImage);
    
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in add product",
      error,
    });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productModel
      .findByIdAndDelete(req.params.id)
      .select("-productImage");
    return res.status(200).send({
      success: true,
      message: "successful deletion",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in deleting product",
      error,
    });
  }
};

//update product
export const updateProduct = async (req, res) => {
  try {
    
    const { name, description, price, category, quantity,productImage } = req.body;
    console.log(name + " " + description);
    const photo=req.file;
    console.log("update p ",photo);
    let newProductImage=productImage;
     if(req.file)
     {
         newProductImage="uploads/products/"+req.file.filename;
     }
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body,productImage:newProductImage, slug: slugify(name) },
      { new: true }
    );
    
 
    return res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

export const filterProductController = async (req, res) => {
  try {
    const { filteredIds, radio } = req.body;
    console.log("ids ", filteredIds);
    const args = {};
    if (filteredIds.length > 0) {
      args.category = filteredIds;
    }
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    console.log("args ", args);
    const products = await productModel.find(args);
    console.log("filtered products ", products);
    return res.status(200).send({
      success: true,
      message: "Product filter",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in filtering product",
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    return res.status(200).send({
      message: "Total products",
      total,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error occured",
    });
  }
};

export const productPagination = async (req, res) => {
  try {
    let perpage = 5;
    let page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find()
    
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: -1 });
    console.log("pagina ", products.length);
    return res.status(200).send({
      success: true,
      message: "product fetched",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error occured",
    });
  }
};

export const productSearchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
    
    return res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error occured",
    });
  }
};

export const similarProductController = async (req, res) => {
  try {
    const { pid, catid } = req.params;
    const products = await productModel
      .find({
        category: catid,
        _id: { $ne: pid },
      })
      .select("-productImage")
      .limit(3)
      .populate("category");
    return res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error occured",
    });
  }
};

// get products by category

export const productsByCategoryController = async (req, res) => {
  try {
    const cat = req.params.slug;
    const category = await categoryModel.findOne({ slug: cat });
    const products = await productModel.find({ category }).populate("category"); //fetch products that mathc the categroy
    return res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error occured",
    });
  }
};

//payment gateway
//token
export const braintreePaymentToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status.send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
//payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (err, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            customer: req.user._id,
          }).save();
          return res.json({ ok: true });
        } else {
          return res.status(500).send(err);
        }
      }
    );
  } catch (error) {}
};

export const placeOrderController = async (req, res) => {
  try {
    const {
      products,
      payment,
      customer,
      userName,
      mobileNumber,
      city,
      postalCode,
      streetAddress,
    } = req.body;
    console.log("customer ", customer);
    // Create a new order instance
    const newOrder = new orderModel({
      products,
      payment,
      customer,
      userName,
      mobileNumber,
      city,
      postalCode,
      streetAddress,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(200).send({
      success: true,
      message: "Order placed",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//
export const ordersController = async (req, res) => {
  try {
    console.log("orders" + req.user._id);
    const userId = req.user._id;
    const orders = await orderModel
      .find({ customer: userId })
      .populate("products");
    console.log(" order ", orders);

    return res.status(200).send({
      message: "order fetched",
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "internal server",
    });
  }
};

export const allOrdersControllers = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products")
      .populate("customer");
    console.log(" order ", orders);

    return res.status(200).send({
      message: "order fetched",
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "internal server",
    });
  }
};
