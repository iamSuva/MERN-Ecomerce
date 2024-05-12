import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./dbconfig/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
const port = process.env.PORT;
import cors from "cors";
connectDB(); //db connection
app.use(express.static("./public"));
app.use(cors()); //allow request from anywhere

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

app.get("/", (req, res) => {
  res.send({ message: "welcome to home page" });
});

app.listen(port, (err) => {
  if (!err) {
    console.log("listening on port ", port);
  }
});
