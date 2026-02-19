const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/gofood";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected Successfully ');

    const db = mongoose.connection.db;

    
    const foodData = await db.collection("Food_Items").find({}).toArray();
    const foodCategory = await db.collection("Food_Category").find({}).toArray();

    
    global.Food_Items = foodData;
    global.Food_Category = foodCategory;

    console.log("Food Items:", foodData.length);
    console.log("Food Category:", foodCategory.length);
    console.log("Food data loaded successfully ");

  } catch (error) {
    console.log("MongoDB Error ", error);
  }
};

module.exports = mongoDB;
