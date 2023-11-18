import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

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

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(
        () => { console.log(`Database connection`) }
    )
    .catch(
        (err) => console.log(err)
    )

app.listen(PORT, () => console.log(`Server up on ${PORT}`));