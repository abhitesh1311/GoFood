const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
  email: String,
  order_date: String,
  order_data: Array
});

const OrderModel = mongoose.model("orders", OrderSchema);


router.post("/orderData", async (req, res) => {
  try {
    const { email, order_data } = req.body;

    console.log("Saving Order:", req.body);  

    await OrderModel.create({
      email: email,
      order_date: new Date().toDateString(),
      order_data: order_data
    });

    res.json({ success: true });

  } catch (error) {
    console.log("SAVE ERROR:", error);
    res.json({ success: false });
  }
});



router.post("/myOrderData", async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Fetching Orders For:", email);  

    const orders = await OrderModel.find({ email: email });

    res.json({ data: orders });

  } catch (error) {
    console.log("FETCH ERROR:", error);
    res.json({ data: [] });
  }
});

module.exports = router;
