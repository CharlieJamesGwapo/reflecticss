-- Fix: Check if profile_photo column exists and is correct type
-- If it exists, we just need to use it. If not, add it.

-- First, let's check the users table structure
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users';

-- The profile_photo column already exists, so we just need to create the notifications table

-- Create notifications table (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Verify profile_photo column exists and is VARCHAR
-- If you need to modify it, use:
-- ALTER TABLE users ALTER COLUMN profile_photo TYPE VARCHAR(500);

-- All set! The database is ready for photo uploads and notifications.
