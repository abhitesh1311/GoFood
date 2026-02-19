const express = require('express');
const router = express.Router();
const User = require('../module/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

router.post(
  '/createuser',
  [
    body('email').isEmail().withMessage("Enter valid email"),
    body('name').isLength({ min: 5 }).withMessage("Name min 5 chars"),
    body('password').isLength({ min: 5 }).withMessage("Password min 5 chars")
  ],

  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, location } = req.body;

      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
      }

      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        location: location
      });

      res.json({
        success: true,
        msg: "User created successfully"
      });

    } catch (error) {
      console.log("ERROR => ", error.message);
      res.status(500).json({ success: false });
    }
  }
);

module.exports = router;
