const express = require("express");
const router = express.Router();

router.post("/foodData", async (req, res) => {
  try {
    console.log("FoodData API called");

    res.json([
      global.Food_Items,
      global.Food_Category
    ]);

  } catch (error) {
    console.error("FoodData Error:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
