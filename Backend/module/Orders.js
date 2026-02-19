const mongoose = require("mongoose");



const OrderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  orders: [
    {
      date: String,
      items: Array,
    },
  ],
});

module.exports = mongoose.model("Orders", OrderSchema);
