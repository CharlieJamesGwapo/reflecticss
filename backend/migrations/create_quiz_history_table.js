const pool = require('../config/database');

async function createQuizHistoryTable() {
  try {
    console.log('Creating quiz_history table...');

    // Create quiz_history table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quiz_history (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        quiz_type VARCHAR(50) NOT NULL,
        category VARCHAR(100),
        score INTEGER NOT NULL,
        correct_answers INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        completed_at TIMESTAMP NOT NULL,
        archived_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ quiz_history table created successfully');

    // Create indexes for better performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_quiz_history_user_id ON quiz_history(user_id)
    `);
    console.log('✅ Index on user_id created');

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_quiz_history_completed_at ON quiz_history(completed_at)
    `);
    console.log('✅ Index on completed_at created');

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_quiz_history_archived_at ON quiz_history(archived_at)
    `);
    console.log('✅ Index on archived_at created');

    console.log('✅ All indexes created successfully');

    // Verify table exists
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'quiz_history'
      )
    `);

    if (result.rows[0].exists) {
      console.log('✅ quiz_history table verified in database');
      
      // Get table info
      const tableInfo = await pool.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'quiz_history'
        ORDER BY ordinal_position
      `);

      console.log('\n📊 Table Structure:');
      console.log('─'.repeat(60));
      tableInfo.rows.forEach(col => {
        console.log(`  ${col.column_name.padEnd(20)} | ${col.data_type.padEnd(20)} | ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULLABLE'}`);
      });
      console.log('─'.repeat(60));
    }

    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating quiz_history table:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

// Run migration
createQuizHistoryTable();
