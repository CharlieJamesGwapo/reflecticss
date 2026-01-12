-- Add profile_photo column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_photo VARCHAR(500);
