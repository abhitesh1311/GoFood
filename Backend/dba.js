const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;


const mongoDB = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");

    await mongoose.connect(mongoURI); 

    console.log("MongoDB Atlas Connected Successfully");

 
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Mongoose error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log(" Mongoose disconnected");
    });

    const db = mongoose.connection.db;

    console.log("⏳ Fetching collections...");

    const foodData = await db.collection("Food_Items").find({}).toArray();
    const foodCategory = await db.collection("Food_Category").find({}).toArray();

    global.Food_Items = foodData;
    global.Food_Category = foodCategory;

    console.log("🍔 Food Items:", foodData.length);
    console.log("📂 Food Category:", foodCategory.length);
    console.log("🎉 Data Loaded Successfully");

  } catch (error) {
    console.error(" MongoDB Connection FAILED ");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
  }
};

module.exports = mongoDB;
