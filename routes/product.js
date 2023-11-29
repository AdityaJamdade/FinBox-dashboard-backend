import express from "express";
import Product from "../models/Product.js"

const router = express.Router();

router.get("/product", async (req, res) => {
    try {
        const Products = await Product.find();
        res.status(200).json(Products)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

export default router;