const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://todo-app-mean.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from the Express API!');
});

app.use('/api', todoRoutes);
app.use('/api', authRoutes);

module.exports = app;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
