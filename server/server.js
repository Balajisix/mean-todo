const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require('./routes/notificationRoute');

require('dotenv').config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    // origin: "https://todo-app-mean.vercel.app",
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from the Express API!');
});

app.use('/api', todoRoutes);
app.use('/api', authRoutes);
app.use('/api/notifications', notificationRoutes);

module.exports = app;

require('./scheduler/pushScheduler')

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });