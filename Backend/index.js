const express = require('express');
const mongoDB = require('./dba');
const cors = require('cors');

const app = express();



app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.send('Server Running ');
});



app.use('/api', require('./routes/CreatUser'));
app.use('/api', require('./routes/loginuser'));
app.use('/api', require('./routes/DisplayData'));
app.use('/api', require('./routes/orderData'));



app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ success: false, message: err.message });
});



const startServer = async () => {
  try {
    await mongoDB();

    app.listen(5001, () => {
      console.log('Server running on port 5001');
    });

  } catch (error) {
    console.log("Server start failed:", error);
  }
};

startServer();
