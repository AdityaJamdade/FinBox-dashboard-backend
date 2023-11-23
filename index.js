import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import { connectToMongo } from "./db.js"
import kpiRoutes from "./routes/kpi.js"
import KPI from "./models/KPI.js"
import { kpis } from "./data/data.js"

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

const PORT = process.env.PORT || 9000;

// MONGOOSE SETUP
const MONGO_URL = process.env.MONGO_URL;
mongoose.Promise = global.Promise;
let db;
mongoose.connect(MONGO_URL, { useMongoClient: true, })
  .then(async () => { 
    app.listen(PORT, () => console.log(`Server up on ${PORT}`));
    db = mongoose.connection
    console.log(db.name)
    // await mongoose.connection.db.dropDatabase();
    KPI.insertMany(kpis);

  })
  .catch((err) => console.log(err))

// async function main() {
//   await mongoose.connect(MONGO_URL, { useMongoClient: true, });
//   app.listen(PORT, () => console.log(`Server up on ${PORT}`));
// }
// main().catch(err => console.log(err));

