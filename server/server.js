const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/images"));
// get driver connection

mongoose.connect(process.env.DB, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
})

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
 
app.listen(port, () => {
  // perform a database connection when server starts
  
  console.log(`Server is running on port: ${port}`);
});