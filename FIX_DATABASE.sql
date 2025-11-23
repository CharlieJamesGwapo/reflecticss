-- Step 1: Add image_url column to coc1_terms table if it doesn't exist
ALTER TABLE coc1_terms ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);

-- Step 2: Insert Super Computer term with image URL
INSERT INTO coc1_terms (term_name, abbreviation, definition, category, image_url)
VALUES (
  'Super Computer',
  NULL,
  'The most powerful type of computer, used for complex tasks like scientific research and space exploration. NASA uses it for launching and controlling space missions.',
  'Types of Computer',
  'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763851860/supercomputer_fiucix.png'
)
ON CONFLICT (term_name) DO UPDATE SET image_url = EXCLUDED.image_url;

-- Step 3: Verify the insertion
SELECT * FROM coc1_terms WHERE term_name = 'Super Computer';
