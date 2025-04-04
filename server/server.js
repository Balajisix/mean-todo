const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const connectDB = require('./config/db');

require('dotenv').config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', todoRoutes);

module.exports = app;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
