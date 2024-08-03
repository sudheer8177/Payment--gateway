import express from "express"
import dotenv from 'dotenv';
import { Payment } from "../app.js";
dotenv.config();


import { checkout } from "../controllers/paymentController.js";
import crypto from "crypto"; // Import crypto module

const router = express.Router();

router.post("/paymentverification", async (req, res) => {
  try {
    console.log(req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    // Debugging: Print out the value of the API secret
    const key= "4xiXT3lnJz6oxsW0bOZ3RNG8"
    // key.toString()

    const expectedSignature = crypto
  .createHmac("sha256", key)
  .update(body)
  .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Assuming Payment is imported from somewhere
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }); 

      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({ success: false, error: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error during payment verification:", error);
    res.status(500).json({ success: false, error: "Payment verification failed" });
  }

});

router.post("/checkout", checkout);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

export default router;
