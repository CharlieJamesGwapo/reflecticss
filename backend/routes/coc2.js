const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// Get all terms for reviewer (similar to questions but with different structure)
router.get('/terms', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = `
      SELECT 
        q.id,
        q.question_text as term,
        q.category,
        q.difficulty,
        c.id as choice_id,
        c.choice_text as definition,
        c.is_correct
      FROM coc2_quiz_questions q
      LEFT JOIN coc2_quiz_choices c ON q.id = c.question_id
    `;
    
    let params = [];
    
    if (category) {
      query += ' WHERE q.category = $1';
      params.push(category);
    }
    
    query += ' ORDER BY q.category, q.id, c.id';
    
    const result = await pool.query(query, params);
    
    // Group choices by question
    const terms = {};
    result.rows.forEach(row => {
      if (!terms[row.id]) {
        terms[row.id] = {
          id: row.id,
          term: row.term,
          category: row.category,
          difficulty: row.difficulty,
          definitions: []
        };
      }
      
      if (row.choice_id) {
        terms[row.id].definitions.push({
          id: row.choice_id,
          definition: row.definition,
          is_correct: row.is_correct
        });
      }
    });
    
    res.json(Object.values(terms));
  } catch (error) {
    console.error('Error fetching terms:', error);
    res.status(500).json({ error: 'Failed to fetch terms' });
  }
});

// Initialize COC 2 with Network Topology questions
router.get('/initialize', async (req, res) => {
  try {
    // Step 1: Create COC2 tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS coc2_questions (
        id SERIAL PRIMARY KEY,
        question_text TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        question_number INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS coc2_choices (
        id SERIAL PRIMARY KEY,
        question_id INTEGER REFERENCES coc2_questions(id) ON DELETE CASCADE,
        choice_text TEXT NOT NULL,
        is_correct BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Step 2: Clear existing data
    await pool.query('DELETE FROM coc2_choices');
    await pool.query('DELETE FROM coc2_questions');

    // Step 3: Insert Network Topology questions
    const questions = [
      {
        question_text: 'Your teacher asks class to redesign computer lab, focusing on how devices are arranged and connected. What concept are you being asked to work on?',
        category: 'Network Topology',
        question_number: 1,
        choices: [
          { choice_text: 'Network Security', is_correct: false },
          { choice_text: 'Network Topology', is_correct: true },
          { choice_text: 'Printer Sharing', is_correct: false },
          { choice_text: 'IP Address', is_correct: false }
        ]
      },
      {
        question_text: 'In a small shop, all computers are connected to a single main cable. When cable is damaged, whole network stops working. What topology is this?',
        category: 'Network Topology',
        question_number: 2,
        choices: [
          { choice_text: 'Mesh', is_correct: false },
          { choice_text: 'Bus', is_correct: true },
          { choice_text: 'Star', is_correct: false },
          { choice_text: 'Hybrid', is_correct: false }
        ]
      },
      {
        question_text: 'A company uses a network where each device passes message to the next one in a circular path. What topology is being used?',
        category: 'Network Topology',
        question_number: 3,
        choices: [
          { choice_text: 'Ring', is_correct: true },
          { choice_text: 'Star', is_correct: false },
          { choice_text: 'Tree', is_correct: false },
          { choice_text: 'Bus', is_correct: false }
        ]
      },
      {
        question_text: 'A school network uses a central switch to connect all computers. If switch fails, all computers lose connection. What topology is this?',
        category: 'Network Topology',
        question_number: 4,
        choices: [
          { choice_text: 'Mesh', is_correct: false },
          { choice_text: 'Star', is_correct: true },
          { choice_text: 'Hybrid', is_correct: false },
          { choice_text: 'Tree', is_correct: false }
        ]
      },
      {
        question_text: 'In a military base, each device is connected to many other devices to ensure communication continues even if one path fails. What topology is this?',
        category: 'Network Topology',
        question_number: 5,
        choices: [
          { choice_text: 'Mesh', is_correct: true },
          { choice_text: 'Ring', is_correct: false },
          { choice_text: 'Bus', is_correct: false },
          { choice_text: 'LAN', is_correct: false }
        ]
      },
      {
        question_text: 'A network starts with a main server, then branches out into smaller connected groups of computers. What topology is this?',
        category: 'Network Topology',
        question_number: 6,
        choices: [
          { choice_text: 'Star', is_correct: false },
          { choice_text: 'Tree', is_correct: true },
          { choice_text: 'Bus', is_correct: false },
          { choice_text: 'Hybrid', is_correct: false }
        ]
      },
      {
        question_text: 'A university uses both star and ring topologies in different buildings, combining them together. What topology is this called?',
        category: 'Network Topology',
        question_number: 7,
        choices: [
          { choice_text: 'Mesh', is_correct: false },
          { choice_text: 'Hybrid', is_correct: true },
          { choice_text: 'Bus', is_correct: false },
          { choice_text: 'Tree', is_correct: false }
        ]
      },
      {
        question_text: 'A computer shop with 12 PCs shares internet and files within shop. What type of network is this?',
        category: 'Network Configuration',
        question_number: 8,
        choices: [
          { choice_text: 'WAN', is_correct: false },
          { choice_text: 'LAN', is_correct: true },
          { choice_text: 'Public Network', is_correct: false },
          { choice_text: 'Domain', is_correct: false }
        ]
      },
      {
        question_text: 'A company connects offices located in Manila, Cebu, and Davao through a single network. What type of network is used?',
        category: 'Network Configuration',
        question_number: 9,
        choices: [
          { choice_text: 'LAN', is_correct: false },
          { choice_text: 'WAN', is_correct: true },
          { choice_text: 'Tree', is_correct: false },
          { choice_text: 'Mesh', is_correct: false }
        ]
      },
      {
        question_text: 'Your phone can\'t connect to Wi-Fi because it has no assigned number that identifies it in network. What is missing?',
        category: 'Network Configuration',
        question_number: 10,
        choices: [
          { choice_text: 'MAC Address', is_correct: false },
          { choice_text: 'DHCP', is_correct: false },
          { choice_text: 'IP Address', is_correct: true },
          { choice_text: 'Firewall', is_correct: false }
        ]
      },
      {
        question_text: 'A home router automatically assigns IP addresses to all phones and laptops that connect. What feature is doing this?',
        category: 'Network Configuration',
        question_number: 11,
        choices: [
          { choice_text: 'Firewall', is_correct: false },
          { choice_text: 'DHCP Server', is_correct: true },
          { choice_text: 'Proxy', is_correct: false },
          { choice_text: 'IPv4', is_correct: false }
        ]
      },
      {
        question_text: 'A school blocks a specific student\'s device from connecting to Wi-Fi by using its unique hardware identifier. What identifier was used?',
        category: 'Network Configuration',
        question_number: 12,
        choices: [
          { choice_text: 'IP Address', is_correct: false },
          { choice_text: 'MAC Address', is_correct: true },
          { choice_text: 'Subnet Mask', is_correct: false },
          { choice_text: 'Domain Name', is_correct: false }
        ]
      },
      {
        question_text: 'Your teacher asks you to identify type of internet addressing that looks like "192.168.1.1." What is this?',
        category: 'Network Configuration',
        question_number: 13,
        choices: [
          { choice_text: 'IPv4', is_correct: true },
          { choice_text: 'IPv6', is_correct: false },
          { choice_text: 'DHCP', is_correct: false },
          { choice_text: 'WAN', is_correct: false }
        ]
      },
      {
        question_text: 'A network admin divides a large network into smaller sections so devices stay organized and secure. What tool does he use?',
        category: 'Network Configuration',
        question_number: 14,
        choices: [
          { choice_text: 'IP Address', is_correct: false },
          { choice_text: 'Subnet Mask', is_correct: true },
          { choice_text: 'MAC Address', is_correct: false },
          { choice_text: 'Firewall', is_correct: false }
        ]
      },
      {
        question_text: 'In your house, all phones and smart TVs are connected through one Wi-Fi. What type of network is this?',
        category: 'Network Location Types',
        question_number: 15,
        choices: [
          { choice_text: 'Work Network', is_correct: false },
          { choice_text: 'Public Network', is_correct: false },
          { choice_text: 'Home Network', is_correct: true },
          { choice_text: 'Domain Network', is_correct: false }
        ]
      },
      {
        question_text: 'A company connects computers to access shared printers, files, and employee data inside office. What network is this?',
        category: 'Network Location Types',
        question_number: 16,
        choices: [
          { choice_text: 'Home Network', is_correct: false },
          { choice_text: 'Work Network', is_correct: true },
          { choice_text: 'Domain Network', is_correct: false },
          { choice_text: 'WAN', is_correct: false }
        ]
      },
      {
        question_text: 'You connect to free Wi-Fi at a coffee shop. This type of network is called:',
        category: 'Network Location Types',
        question_number: 17,
        choices: [
          { choice_text: 'Domain', is_correct: false },
          { choice_text: 'LAN', is_correct: false },
          { choice_text: 'Public Network', is_correct: true },
          { choice_text: 'Tree', is_correct: false }
        ]
      },
      {
        question_text: 'A school has a server that controls login access of all students and teachers. What type of network is this?',
        category: 'Network Location Types',
        question_number: 18,
        choices: [
          { choice_text: 'Public', is_correct: false },
          { choice_text: 'Home', is_correct: false },
          { choice_text: 'Domain', is_correct: true },
          { choice_text: 'LAN', is_correct: false }
        ]
      },
      {
        question_text: 'Three classmates work on a project using same folder accessible over school network. What is this called?',
        category: 'Network Sharing',
        question_number: 19,
        choices: [
          { choice_text: 'Printer Sharing', is_correct: false },
          { choice_text: 'File Sharing', is_correct: true },
          { choice_text: 'Domain Network', is_correct: false },
          { choice_text: 'WAN', is_correct: false }
        ]
      },
      {
        question_text: 'In an office, all employees can print from the same printer over network. What is this?',
        category: 'Network Sharing',
        question_number: 20,
        choices: [
          { choice_text: 'LAN', is_correct: false },
          { choice_text: 'Printer Sharing', is_correct: true },
          { choice_text: 'Proxy', is_correct: false },
          { choice_text: 'Firewall', is_correct: false }
        ]
      },
      {
        question_text: 'A business installs tools to protect its network from hackers. What is this called?',
        category: 'Network Security',
        question_number: 21,
        choices: [
          { choice_text: 'IP Addressing', is_correct: false },
          { choice_text: 'Network Security', is_correct: true },
          { choice_text: 'File Sharing', is_correct: false },
          { choice_text: 'Public Network', is_correct: false }
        ]
      },
      {
        question_text: 'A downloaded file started damaging system files and spreading on its own to other computers. What is this?',
        category: 'Network Security',
        question_number: 22,
        choices: [
          { choice_text: 'Firewall', is_correct: false },
          { choice_text: 'Virus', is_correct: true },
          { choice_text: 'Proxy', is_correct: false },
          { choice_text: 'Subnet', is_correct: false }
        ]
      },
      {
        question_text: 'Your router blocks suspicious incoming traffic to protect your data. What is this feature?',
        category: 'Network Security',
        question_number: 23,
        choices: [
          { choice_text: 'Subnet Mask', is_correct: false },
          { choice_text: 'Virus Protection', is_correct: false },
          { choice_text: 'Firewall', is_correct: true },
          { choice_text: 'Mesh Topology', is_correct: false }
        ]
      },
      {
        question_text: 'Your company uses a firewall that decides which applications should be allowed to send or receive traffic. What type is this?',
        category: 'Network Security',
        question_number: 24,
        choices: [
          { choice_text: 'Proxy Firewall', is_correct: false },
          { choice_text: 'Application Layer Firewall', is_correct: true },
          { choice_text: 'Inbound Rule', is_correct: false },
          { choice_text: 'WAN Security', is_correct: false }
        ]
      },
      {
        question_text: 'A system checks app traffic and blocks certain apps from connecting to internet. What firewall is used?',
        category: 'Network Security',
        question_number: 25,
        choices: [
          { choice_text: 'Application Firewall', is_correct: true },
          { choice_text: 'Mesh Firewall', is_correct: false },
          { choice_text: 'Proxy Firewall', is_correct: false },
          { choice_text: 'Outbound Rule', is_correct: false }
        ]
      },
      {
        question_text: 'Your school uses a firewall that hides internal devices by acting as a middleman between user and internet. What firewall is this?',
        category: 'Network Security',
        question_number: 26,
        choices: [
          { choice_text: 'Outbound', is_correct: false },
          { choice_text: 'Proxy Firewall', is_correct: true },
          { choice_text: 'Application Layer', is_correct: false },
          { choice_text: 'Virus Filter', is_correct: false }
        ]
      },
      {
        question_text: 'Your laptop blocks all unknown connections that try to enter system. What is being used?',
        category: 'Network Security',
        question_number: 27,
        choices: [
          { choice_text: 'Outbound Rules', is_correct: false },
          { choice_text: 'Inbound Rules', is_correct: true },
          { choice_text: 'MAC Filtering', is_correct: false },
          { choice_text: 'DHCP', is_correct: false }
        ]
      },
      {
        question_text: 'A computer is allowed to connect to websites except social media, which is blocked. What rule controls this?',
        category: 'Network Security',
        question_number: 28,
        choices: [
          { choice_text: 'Inbound', is_correct: false },
          { choice_text: 'Outbound', is_correct: true },
          { choice_text: 'Subnet', is_correct: false },
          { choice_text: 'Printer Sharing', is_correct: false }
        ]
      },
      {
        question_text: 'Two computers in a company exchange encrypted data to stay protected from unauthorized access. What rule is used?',
        category: 'Network Security',
        question_number: 29,
        choices: [
          { choice_text: 'Firewall Rules', is_correct: false },
          { choice_text: 'Connection Security Rules', is_correct: true },
          { choice_text: 'WAN Rules', is_correct: false },
          { choice_text: 'Proxy Controls', is_correct: false }
        ]
      }
    ];

    // Step 4: Insert questions and choices
    for (const question of questions) {
      const questionResult = await pool.query(
        'INSERT INTO coc2_questions (question_text, category, question_number) VALUES ($1, $2, $3) RETURNING id',
        [question.question_text, question.category, question.question_number]
      );
      
      const questionId = questionResult.rows[0].id;
      
      for (const choice of question.choices) {
        await pool.query(
          'INSERT INTO coc2_choices (question_id, choice_text, is_correct) VALUES ($1, $2, $3)',
          [questionId, choice.choice_text, choice.is_correct]
        );
      }
    }

    res.json({ 
      message: 'COC 2 Network Topology questions initialized successfully',
      totalQuestions: questions.length,
      categories: ['Network Topology', 'Network Configuration', 'Network Location Types', 'Network Sharing', 'Network Security']
    });

  } catch (error) {
    console.error('Error initializing COC2:', error);
    res.status(500).json({ error: 'Failed to initialize COC2' });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT category FROM coc2_quiz_questions ORDER BY category');
    const categories = result.rows.map(row => row.category);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get questions by category
router.get('/questions', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = `
      SELECT 
        q.id,
        q.question_text,
        q.category,
        q.difficulty,
        c.id as choice_id,
        c.choice_text,
        c.is_correct
      FROM coc2_quiz_questions q
      LEFT JOIN coc2_quiz_choices c ON q.id = c.question_id
    `;
    
    let params = [];
    
    if (category) {
      query += ' WHERE q.category = $1';
      params.push(category);
    }
    
    query += ' ORDER BY q.category, q.id, c.id';
    
    const result = await pool.query(query, params);
    
    // Group choices by question
    const questions = {};
    result.rows.forEach(row => {
      if (!questions[row.id]) {
        questions[row.id] = {
          id: row.id,
          question_text: row.question_text,
          category: row.category,
          difficulty: row.difficulty,
          choices: []
        };
      }
      
      if (row.choice_id) {
        questions[row.id].choices.push({
          id: row.choice_id,
          choice_text: row.choice_text,
          is_correct: row.is_correct
        });
      }
    });
    
    res.json(Object.values(questions));
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Get specific question with choices
router.get('/quiz/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const questionResult = await pool.query(
      'SELECT * FROM coc2_questions WHERE id = $1',
      [id]
    );
    
    const choicesResult = await pool.query(
      'SELECT * FROM coc2_choices WHERE question_id = $1 ORDER BY id',
      [id]
    );
    
    if (questionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }
    
    const question = questionResult.rows[0];
    question.choices = choicesResult.rows;
    
    res.json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

module.exports = router;
