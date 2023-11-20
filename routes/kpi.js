import express from "express";

const router = express.Router();

router.get("/kpis", async (req, res) => {
    try {
        const kpis = KPI.find();
        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

export default router;