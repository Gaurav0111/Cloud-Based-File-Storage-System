const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Importing the auth routes
const uploadRoutes = require('./routes/uploadRoutes'); // Importing the upload routes
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(`DB Connection Error: ${err.message}`));

// Routes
app.use('/api/auth', authRoutes); // Register routes for authentication
app.use('/api/upload', uploadRoutes); // Register routes for file uploads

// Server Initialization
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
