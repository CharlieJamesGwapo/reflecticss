const pool = require('./config/database');

async function testConnection() {
  try {
    console.log('Testing database connection...');
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected successfully:', result.rows[0]);
    
    // Test users table
    const usersResult = await pool.query('SELECT COUNT(*) FROM users');
    console.log('Users table count:', usersResult.rows[0]);
    
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await pool.end();
  }
}

testConnection();
