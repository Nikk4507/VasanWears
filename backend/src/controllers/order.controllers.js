import { Order } from "../model/order.model.js";
import { Payment } from "../model/payment.model.js";
import { Cart } from "../model/cart.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import sendEmail from "../utils/sendEmail.js";
import { User } from "../model/user.model.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await  User.findById(userId);
    
    const {
      shippingAddress,
      paymentMethod,
      discount = 0,
      deliveryCharge = 0,
    } = req.body;

    if (!shippingAddress || !paymentMethod) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Missing required fields"));
    }

    /* ================= GET CART ================= */
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product items.color items.size"
    );

    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Cart is empty"));
    }

    /* ================= BUILD ORDER ITEMS ================= */
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      variant: item.variant,
      color: item.color._id,
      size: item.size?._id || null,
      sku: item.sku,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    }));

    const subtotal = cart.subtotal;
    const totalAmount = subtotal - discount + deliveryCharge;

    /* ================= CREATE ORDER ================= */
    const order = await Order.create({
      user: userId,
      items: orderItems,
      subtotal,
      discount,
      deliveryCharge,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "PENDING" : "PENDING",
      orderStatus: "PLACED",
      shippingAddress,
    });
    console.log("User email ", user.email);
    
    await sendEmail({
      email: user.email,
      subject: "Order Placed Successfully - Vasan Wears",
      title: "Thank you for your order!",
      message: `
        Hi ${user.fullName},<br/><br/>
        Your order <b>#${order._id}</b> has been placed successfully.<br/>
        We’ll notify you once it’s shipped.
      `,
      buttonText: "View Order",
      url: `${process.env.FRONTEND_URL}/orders/${order._id}`,
    });
    await sendEmail({
      email: process.env.EMAIL_USER,
      subject: "New Order Received - Vasan Wears",
      title: "New Order Alert 🚨",
      message: `
    A new order has been placed.<br/><br/>
    <b>Order ID:</b> ${order._id}<br/>
    <b>Customer:</b> ${user.name} (${user.email})<br/>
    <b>Total:</b> ₹${order.totalAmount}
  `,
      buttonText: "View in Admin Panel",
      url: `${process.env.ADMIN_PANEL_URL}/orders/${order._id}`,
    });
    /* ================= CREATE PAYMENT ================= */
    const payment = await Payment.create({
      user: userId,
      order: order._id,
      method: paymentMethod,
      amount: totalAmount,
      status: paymentMethod === "COD" ? "PENDING" : "PENDING",
    });

    order.paymentId = payment._id;
    await order.save();

    /* ================= CLEAR CART ================= */
    cart.items = [];
    cart.subtotal = 0;
    await cart.save();

    return res.status(201).json(
      new ApiResponse(201, "Order placed successfully", {
        order,
        payment,
      })
    );
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product items.color items.size paymentId")
      .sort({ createdAt: -1 });

    res.status(200).json(
      new ApiResponse(200, "Orders fetched successfully", orders)
    );
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product items.color items.size paymentId");

    if (!order) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Order not found"));
    }

    res.status(200).json(
      new ApiResponse(200, "Order fetched successfully", order)
    );
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

