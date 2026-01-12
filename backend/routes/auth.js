const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'reflecticsss/profiles',
      resource_type: 'auto',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
      public_id: `profile_${Date.now()}`
    };
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed types: ${allowedMimes.join(', ')}`));
    }
  }
});

// Register with optional profile photo
router.post('/register', upload.single('profilePhoto'), [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Declare variables outside try block for catch block access
  let email, name, profilePhoto, password;

  try {
    email = req.body.email;
    name = req.body.name;
    profilePhoto = req.file ? req.file.path : null;
    password = req.body.password;

    // Check if user exists
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (hashError) {
      console.error('Password hashing error:', hashError);
      return res.status(500).json({ error: 'Password hashing failed' });
    }

    // Create user with optional profile photo
    let query, params;
    if (profilePhoto) {
      query = 'INSERT INTO users (email, password, name, profile_photo) VALUES ($1, $2, $3, $4) RETURNING id, email, name, profile_photo';
      params = [email, hashedPassword, name, profilePhoto];
    } else {
      query = 'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, profile_photo';
      params = [email, hashedPassword, name];
    }
    
    const result = await db.query(query, params);

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration error details:', {
      message: error.message,
      stack: error.stack,
      email: email,
      name: name,
      hasProfilePhoto: !!profilePhoto
    });
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

// Login
router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Find user
    const result = await db.query('SELECT id, email, name, password, profile_photo FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      user: { id: user.id, email: user.email, name: user.name, profile_photo: user.profile_photo },
      token
    });
  } catch (error) {
    console.error('Login error details:', {
      message: error.message,
      stack: error.stack,
      email: email
    });
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

// Verify token
router.get('/verify', verifyToken, async (req, res) => {
  try {
    const result = await db.query('SELECT id, email, name, profile_photo FROM users WHERE id = $1', [req.userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Verification error details:', {
      message: error.message,
      stack: error.stack,
      userId: req.userId
    });
    res.status(500).json({ error: 'Verification failed', details: error.message });
  }
});

module.exports = router;
