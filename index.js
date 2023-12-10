import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import kpiRoutes from "./routes/kpi.js"
import productRoutes from "./routes/product.js"
import transactionRoutes from "./routes/transaction.js"
import KPI from "./models/KPI.js"
import Product from "./models/Product.js"
import Transaction from "./models/Transaction.js"
import { kpis, products, transactions } from "./data/data.js"

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

const PORT = process.env.PORT || 9000;

// MONGOOSE SETUP
const MONGO_URL = process.env.MONGO_URL;
mongoose.Promise = global.Promise;
let db;
mongoose.connect(MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`Server up on ${PORT}`));
    db = mongoose.connection
    console.log(db.name)

    // ADDING DATA ONCE
    // await mongoose.connection.db.dropDatabase();
    // await KPI.insertMany(kpis);
    // await Product.insertMany(products);
    // await Transaction.insertMany(transactions);
    // await Transaction.deleteMany({});

  })
  .catch((err) => console.log(err))
