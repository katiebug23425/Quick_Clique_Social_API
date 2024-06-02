// Import Mongoose connection
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Quick_Clique', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Export the connection
module.exports = mongoose.connection;