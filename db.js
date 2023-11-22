import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;

export const connectToMongo = async () => {
    try {
        mongoose.connect(MONGO_URL, () => {
            console.log('Connected to mongo successfully');
        })
        await mongoose.connection.db.dropDatabase();
    } catch (error) {
        console.log(error.message)
    }
}

