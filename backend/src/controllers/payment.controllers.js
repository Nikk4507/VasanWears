import crypto from "crypto";
import { Payment } from "../model/payment.model.js";
import { Order } from "../model/order.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import sendEmail from "../utils/sendEmail.js";

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentId,
    } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Payment not found"));
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      payment.status = "FAILED";
      await payment.save();

      return res
        .status(400)
        .json(new ApiResponse(400, "Payment verification failed"));
    }

    /* ================= UPDATE PAYMENT ================= */
    payment.status = "PAID";
    payment.gateway = "RAZORPAY";
    payment.gatewayOrderId = razorpay_order_id;
    payment.gatewayPaymentId = razorpay_payment_id;
    payment.gatewaySignature = razorpay_signature;
    payment.paidAt = new Date();

    await payment.save();

    /* ================= UPDATE ORDER ================= */
    const order = await Order.findById(payment.order);
    order.paymentStatus = "PAID";
    order.isPaid = true;
    order.paidAt = new Date();
    order.orderStatus = "CONFIRMED";

    await order.save();
    await sendEmail({
      email: orderUser.email,
      subject: "Payment Successful - Vasan Wears",
      title: "Payment Received ✅",
      message: `
    Your payment for order <b>#${order._id}</b> was successful.<br/>
    We’ll start processing your order shortly.
  `,
      buttonText: "Track Order",
      buttonLink: `${process.env.FRONTEND_URL}/orders/${order._id}`,
    });
    res.status(200).json(
      new ApiResponse(200, "Payment verified successfully", {
        order,
        payment,
      })
    );
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};
