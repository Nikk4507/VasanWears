import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/order.controllers.js";
import verifyJwt from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/place", verifyJwt, placeOrder);
router.get("/my-orders", verifyJwt, getMyOrders);
router.get("/:id", verifyJwt, getOrderById);

export default router;
