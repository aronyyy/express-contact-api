const express = require('express');
const dotenv = require("dotenv").config();
const { errorHandler } = require('./middleware/errorHandler');
const { connectDb } = require('./config/dbConnection');

connectDb();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/contacts', require('./routes/contact'));  
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})