const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const courseRoutes = require('./routes/coursesRoutes');
const linkroute = require('./routes/linkroute');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/courses', courseRoutes);
app.use('/api/link', linkroute);

// MongoDB connection
const db = config.get("mongoURI");

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error(`❌ Connection Error: ${err.message}`));

// Start server
const PORT = config.get("port") || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
