// Imports
require("dotenv").config(); 
const mongoose = require("mongoose");

// Connect to MongoDB database
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//Export the connection
module.exports = mongoose.connection;
