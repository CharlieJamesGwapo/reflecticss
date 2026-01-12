const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

async function testRegistration() {
  try {
    console.log('Testing registration process...');
    
    // Test the exact query that auth.js is using
    const email = 'test@example.com';
    const password = 'password123';
    const name = 'Test User';
    const hashedPassword = '$2b$10$abcdefghijklmnopqrstuvwx.yz1234567890';
    
    const query = 'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, profile_photo';
    const params = [email, hashedPassword, name];
    
    console.log('Query:', query);
    console.log('Params:', params);
    
    const result = await pool.query(query, params);
    console.log('Success! User created:', result.rows[0]);
    
  } catch (error) {
    console.error('Registration test error:', error.message);
    console.error('Error details:', error);
  } finally {
    await pool.end();
  }
}

testRegistration();
