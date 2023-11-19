import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;

export const connectToMongo = () => {
    try {
        mongoose.connect(MONGO_URL, () => {
            console.log('Connected to mongo successfully');
        })
    } catch (error) {
        console.log(error.message)
    }
}

