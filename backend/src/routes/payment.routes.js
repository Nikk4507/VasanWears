import express from "express";
import { verifyPayment } from "../controllers/payment.controllers.js";
import verifyJwt from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/verify", verifyJwt, verifyPayment);

export default router;
