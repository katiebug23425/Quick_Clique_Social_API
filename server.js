//Import packages and files
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Environment variables
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes defined in routes/index.js
app.use(routes);

// Connect to MongoDB database and start server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
