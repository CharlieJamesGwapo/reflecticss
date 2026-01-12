const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import SQLite auth functions
const { register, login } = require('./auth-sqlite');

// Routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', database: 'SQLite' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`SQLite auth server running on port ${PORT}`);
});
