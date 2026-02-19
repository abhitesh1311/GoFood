const express = require("express");
const router = express.Router();
const User = require("../module/user");   // ⭐ FIXED PATH
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mySecretKey";

router.post("/loginuser", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, msg: "Invalid password" });
    }

    
    const data = {
      user: { id: user.id }
    };

    const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: "7d" });

    
    res.json({
      success: true,
      authToken: authToken,
      email: user.email,   
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error.message);
    res.json({ success: false });
  }
});

module.exports = router;
