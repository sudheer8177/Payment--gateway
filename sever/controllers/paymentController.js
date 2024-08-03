// paymentController.js

import { Payment } from "../app.js";
import crypto from "crypto";
import { instance } from "../Server.js";

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ success: false, error: "Checkout failed" });
  }
};

 