const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// Initialize COC 3 with Wireless & Network Protocols content
router.get('/initialize', async (req, res) => {
  try {
    // Add missing columns if they don't exist
    await pool.query(
      'ALTER TABLE coc3_terms ADD COLUMN IF NOT EXISTS abbreviation VARCHAR(50)'
    );
    await pool.query(
      'ALTER TABLE coc3_terms ADD COLUMN IF NOT EXISTS image_url VARCHAR(500)'
    );

    // Step 1: Add Wireless & Network Protocols terms
    const allTerms = [
      // Wireless Network Identification
      {
        name: 'SSID',
        abbreviation: 'Service Set Identifier',
        definition: 'Service Set Identifier - the name of a wireless network that helps users identify and connect to the correct network.',
        category: 'Wireless Network Identification',
        example: 'When you look at available Wi-Fi networks on your phone, "HomeWiFi_Network" is an SSID.',
        image: null
      },
      {
        name: 'BSSID',
        abbreviation: 'Basic Service Set Identifier',
        definition: 'Basic Service Set Identifier - the MAC address of the wireless access point.',
        category: 'Wireless Network Identification',
        example: 'The router\'s MAC address serves as the BSSID.',
        image: null
      },
      {
        name: 'MAC Address',
        abbreviation: 'Media Access Control',
        definition: 'Media Access Control address - a unique identifier assigned to network interfaces.',
        category: 'Wireless Network Identification',
        example: '00:1A:2B:3C:4D:5E is an example MAC address.',
        image: null
      },
      // Wireless Network Types
      {
        name: 'WPAN',
        abbreviation: 'Wireless Personal Area Network',
        definition: 'Wireless Personal Area Network - short-range wireless network for personal devices.',
        category: 'Wireless Network Types',
        example: 'Bluetooth connection between phone and smartwatch.',
        image: null
      },
      {
        name: 'WLAN',
        abbreviation: 'Wireless Local Area Network',
        definition: 'Wireless Local Area Network - wireless network covering a limited area like home or office.',
        category: 'Wireless Network Types',
        example: 'Home Wi-Fi network covering your house.',
        image: null
      },
      {
        name: 'WMAN',
        abbreviation: 'Wireless Metropolitan Area Network',
        definition: 'Wireless Metropolitan Area Network - wireless network covering a city or metropolitan area.',
        category: 'Wireless Network Types',
        example: 'City-wide Wi-Fi coverage across districts.',
        image: null
      },
      {
        name: 'WWAN',
        abbreviation: 'Wireless Wide Area Network',
        definition: 'Wireless Wide Area Network - wireless network covering large geographical areas.',
        category: 'Wireless Network Types',
        example: 'Cellular network coverage across countries.',
        image: null
      },
      // Network Protocols
      {
        name: 'HTTP',
        abbreviation: 'Hypertext Transfer Protocol',
        definition: 'Hypertext Transfer Protocol - protocol for transferring web pages on the internet.',
        category: 'Network Protocols',
        example: 'https://www.example.com uses HTTP/HTTPS.',
        image: null
      },
      {
        name: 'FTP',
        abbreviation: 'File Transfer Protocol',
        definition: 'File Transfer Protocol - protocol for transferring files between client and server.',
        category: 'Network Protocols',
        example: 'Downloading files from an FTP server.',
        image: null
      },
      {
        name: 'CSMA/CD',
        abbreviation: 'Carrier Sense Multiple Access with Collision Detection',
        definition: 'Carrier Sense Multiple Access with Collision Detection - protocol where devices check if the medium is free before transmitting.',
        category: 'Network Protocols',
        example: 'Ethernet networks use CSMA/CD to prevent data collisions.',
        image: null
      },
      {
        name: 'TCP/IP',
        abbreviation: 'Transmission Control Protocol/Internet Protocol',
        definition: 'Transmission Control Protocol/Internet Protocol - suite of communication protocols for the internet.',
        category: 'Network Protocols',
        example: 'All internet communication relies on TCP/IP.',
        image: null
      },
      {
        name: 'DNS',
        abbreviation: 'Domain Name System',
        definition: 'Domain Name System - system that translates domain names to IP addresses.',
        category: 'Network Protocols',
        example: 'DNS converts www.google.com to 172.217.14.228.',
        image: null
      },
      // Wireless Network Problems
      {
        name: 'Shared Resource Issue',
        abbreviation: null,
        definition: 'Performance degradation when too many devices share the same wireless medium.',
        category: 'Wireless Network Problems',
        example: 'Wi-Fi slowing down when many employees are connected.',
        image: null
      },
      {
        name: 'Absorption',
        abbreviation: null,
        definition: 'Signal weakening when wireless signals pass through materials that absorb radio waves.',
        category: 'Wireless Network Problems',
        example: 'Metal cabinets blocking Wi-Fi signals.',
        image: null
      },
      {
        name: 'Reflection',
        abbreviation: null,
        definition: 'Signal bouncing off surfaces causing interference and signal distortion.',
        category: 'Wireless Network Problems',
        example: 'Wi-Fi signals reflecting off walls and furniture.',
        image: null
      },
      {
        name: 'Hidden Node Problem',
        abbreviation: null,
        definition: 'When wireless devices cannot detect each other, causing simultaneous transmissions and collisions.',
        category: 'Wireless Network Problems',
        example: 'Two devices transmitting at same time because they can\'t sense each other.',
        image: null
      },
      {
        name: 'Signal Interference',
        abbreviation: null,
        definition: 'Disruption of wireless signals by other devices or networks operating on same frequency.',
        category: 'Wireless Network Problems',
        example: 'Microwave oven interfering with Wi-Fi signal.',
        image: null
      },
      {
        name: 'Channel Overlap',
        abbreviation: null,
        definition: 'Performance issues when multiple Wi-Fi networks use overlapping frequency channels.',
        category: 'Wireless Network Problems',
        example: 'Neighbors\' Wi-Fi networks causing interference.',
        image: null
      },
      // Network Configuration
      {
        name: 'Router Admin Page',
        abbreviation: null,
        definition: 'Web interface for configuring router settings and network parameters.',
        category: 'Network Configuration',
        example: 'Accessing 192.168.1.1 to configure home router.',
        image: null
      },
      {
        name: 'DHCP',
        abbreviation: 'Dynamic Host Configuration Protocol',
        definition: 'Dynamic Host Configuration Protocol - automatically assigns IP addresses to devices on a network.',
        category: 'Network Configuration',
        example: 'Router assigning IP 192.168.1.100 to your laptop.',
        image: null
      },
      {
        name: 'NAT',
        abbreviation: 'Network Address Translation',
        definition: 'Network Address Translation - method of remapping one IP address space to another.',
        category: 'Network Configuration',
        example: 'Multiple devices sharing one public IP address.',
        image: null
      },
      {
        name: 'Firewall',
        abbreviation: null,
        definition: 'Security system that monitors and controls incoming and outgoing network traffic.',
        category: 'Network Configuration',
        example: 'Router blocking unauthorized access attempts.',
        image: null
      }
    ];

    // Step 2: Clear existing data and insert new terms
    await pool.query('DELETE FROM coc3_terms');
    
    for (const term of allTerms) {
      await pool.query(
        'INSERT INTO coc3_terms (category, term_name, definition, abbreviation, example, image_url) VALUES ($1, $2, $3, $4, $5, $6)',
        [term.category, term.name, term.definition, term.abbreviation, term.example, term.image]
      );
    }

    // Step 3: Add quiz questions
    const quizQuestions = [
      {
        question: 'Your phone detects several Wi-Fi networks in a mall. You want to connect to the store\'s official Wi-Fi. What identifier helps you choose the correct network?',
        category: 'Wireless Network Identification',
        difficulty: 'easy',
        choices: [
          { text: 'MAC Address', correct: false },
          { text: 'IP Address', correct: false },
          { text: 'SSID', correct: true },
          { text: 'BSSID', correct: false }
        ]
      },
      {
        question: 'You are sharing files between your smartwatch and smartphone without any cables. What type of wireless network are you using?',
        category: 'Wireless Network Types',
        difficulty: 'easy',
        choices: [
          { text: 'WLAN', correct: false },
          { text: 'WPAN', correct: true },
          { text: 'WMAN', correct: false },
          { text: 'WWAN', correct: false }
        ]
      },
      {
        question: 'A company complains that their Wi-Fi is slowing down because too many employees are connected at the same time. What issue are they experiencing?',
        category: 'Wireless Network Problems',
        difficulty: 'medium',
        choices: [
          { text: 'Signal Interference', correct: false },
          { text: 'Shared Resource Issue', correct: true },
          { text: 'Bandwidth Throttling', correct: false },
          { text: 'Network Congestion', correct: false }
        ]
      },
      {
        question: 'You try to open a webpage but your browser shows an error because the protocol used to fetch web pages isn\'t responding. What protocol is likely failing?',
        category: 'Network Protocols',
        difficulty: 'easy',
        choices: [
          { text: 'FTP', correct: false },
          { text: 'HTTP', correct: true },
          { text: 'SMTP', correct: false },
          { text: 'DNS', correct: false }
        ]
      },
      {
        question: 'Your computer sends data over a wired connection and checks if the line is clear before sending to avoid collisions. What protocol is it using?',
        category: 'Network Protocols',
        difficulty: 'medium',
        choices: [
          { text: 'CSMA/CD', correct: true },
          { text: 'TCP/IP', correct: false },
          { text: 'Ethernet', correct: false },
          { text: 'UDP', correct: false }
        ]
      },
      {
        question: 'You\'re trying to download large files from your school\'s server, but the protocol meant for file transfer isn\'t functioning correctly. Which protocol is this?',
        category: 'Network Protocols',
        difficulty: 'easy',
        choices: [
          { text: 'HTTP', correct: false },
          { text: 'FTP', correct: true },
          { text: 'SSH', correct: false },
          { text: 'Telnet', correct: false }
        ]
      },
      {
        question: 'You notice your Wi-Fi signal weakens significantly when you move behind a metal cabinet. Which wireless problem is causing this?',
        category: 'Wireless Network Problems',
        difficulty: 'medium',
        choices: [
          { text: 'Channel Overlap', correct: false },
          { text: 'Absorption/Reflection', correct: true },
          { text: 'Signal Fading', correct: false },
          { text: 'Interference', correct: false }
        ]
      },
      {
        question: 'You are configuring your home router through a web interface using its IP address. What feature are you accessing?',
        category: 'Network Configuration',
        difficulty: 'easy',
        choices: [
          { text: 'Command Line Interface', correct: false },
          { text: 'Router Admin Page', correct: true },
          { text: 'Network Settings', correct: false },
          { text: 'DHCP Server', correct: false }
        ]
      },
      {
        question: 'A citywide wireless network allows people across multiple districts to stay connected. What type of wireless network is this?',
        category: 'Wireless Network Types',
        difficulty: 'medium',
        choices: [
          { text: 'WPAN', correct: false },
          { text: 'WLAN', correct: false },
          { text: 'WMAN/WWAN', correct: true },
          { text: 'VPN', correct: false }
        ]
      },
      {
        question: 'A device cannot detect another device on the same network even though both are transmitting data, causing interference issues. What wireless problem is this?',
        category: 'Wireless Network Problems',
        difficulty: 'hard',
        choices: [
          { text: 'Hidden Node Problem', correct: true },
          { text: 'Exposed Node Problem', correct: false },
          { text: 'Signal Attenuation', correct: false },
          { text: 'Multipath Fading', correct: false }
        ]
      }
    ];

    // Step 4: Clear existing quiz data and insert new questions
    await pool.query('DELETE FROM coc3_quiz_attempts');
    await pool.query('DELETE FROM coc3_quiz_choices');
    await pool.query('DELETE FROM coc3_quiz_questions');
    
    for (const q of quizQuestions) {
      const questionResult = await pool.query(
        'INSERT INTO coc3_quiz_questions (question_text, category, difficulty) VALUES ($1, $2, $3) RETURNING id',
        [q.question, q.category, q.difficulty]
      );
      
      const questionId = questionResult.rows[0].id;
      
      for (const choice of q.choices) {
        await pool.query(
          'INSERT INTO coc3_quiz_choices (question_id, choice_text, is_correct) VALUES ($1, $2, $3)',
          [questionId, choice.text, choice.correct]
        );
      }
    }

    res.json({ 
      message: 'COC 3 Wireless & Network Protocols initialized successfully',
      termsAdded: allTerms.length,
      questionsAdded: quizQuestions.length
    });

  } catch (error) {
    console.error('Error initializing COC 3:', error);
    res.status(500).json({ error: 'Failed to initialize COC 3' });
  }
});

// Get all COC 3 terms
router.get('/terms', async (req, res) => {
  try {
    const category = req.query.category;
    let query = 'SELECT * FROM coc3_terms ORDER BY category, term_name';
    const params = [];

    if (category) {
      query = 'SELECT * FROM coc3_terms WHERE category = $1 ORDER BY term_name';
      params.push(category);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching terms:', error);
    res.status(500).json({ error: 'Failed to fetch terms' });
  }
});

// Get term by ID
router.get('/terms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM coc3_terms WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Term not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching term:', error);
    res.status(500).json({ error: 'Failed to fetch term' });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT category FROM coc3_terms ORDER BY category'
    );
    res.json(result.rows.map(row => row.category));
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get quiz questions
router.get('/quiz/questions', async (req, res) => {
  try {
    const { category } = req.query;
    let query = `
      SELECT q.*, 
             JSON_AGG(
               JSON_BUILD_OBJECT(
                 'id', c.id,
                 'choice_text', c.choice_text,
                 'is_correct', c.is_correct
               )
             ) as choices
      FROM coc3_quiz_questions q
      LEFT JOIN coc3_quiz_choices c ON q.id = c.question_id
    `;
    
    let params = [];
    
    if (category) {
      query += ' WHERE q.category = $1';
      params.push(category);
    }
    
    query += ' GROUP BY q.id, q.question_text, q.category, q.difficulty, q.created_at ORDER BY q.category, q.id';
    
    const result = await pool.query(query, params);
    
    // Parse the JSON choices
    const questions = result.rows.map(row => ({
      ...row,
      choices: row.choices || []
    }));
    
    res.json(questions);
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    res.status(500).json({ error: 'Failed to fetch quiz questions' });
  }
});

// Get specific quiz question with choices
router.get('/quiz/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const questionResult = await pool.query(
      'SELECT * FROM coc3_quiz_questions WHERE id = $1',
      [id]
    );
    
    if (questionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }
    
    const choicesResult = await pool.query(
      'SELECT * FROM coc3_quiz_choices WHERE question_id = $1 ORDER BY id',
      [id]
    );
    
    res.json({
      question: questionResult.rows[0],
      choices: choicesResult.rows
    });
  } catch (error) {
    console.error('Error fetching quiz question:', error);
    res.status(500).json({ error: 'Failed to fetch quiz question' });
  }
});

// Submit quiz answer
router.post('/quiz/submit', verifyToken, async (req, res) => {
  try {
    const { questionId, selectedChoiceId } = req.body;
    const userId = req.user.id;

    // Get the correct answer
    const choiceResult = await pool.query(
      'SELECT is_correct FROM coc3_quiz_choices WHERE id = $1',
      [selectedChoiceId]
    );

    if (choiceResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid choice' });
    }

    const isCorrect = choiceResult.rows[0].is_correct;

    // Record the attempt
    await pool.query(
      'INSERT INTO coc3_quiz_attempts (user_id, question_id, selected_choice_id, is_correct) VALUES ($1, $2, $3, $4)',
      [userId, questionId, selectedChoiceId, isCorrect]
    );

    res.json({ isCorrect });

  } catch (error) {
    console.error('Error submitting quiz answer:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

// Complete quiz
router.post('/quiz/complete', verifyToken, async (req, res) => {
  try {
    const { category, score, correct, total } = req.body;
    const userId = req.user.id;

    // Update or insert user progress
    await pool.query(`
      INSERT INTO coc3_user_progress (user_id, total_questions, correct_answers, score, last_attempted)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        total_questions = EXCLUDED.total_questions + $2,
        correct_answers = EXCLUDED.correct_answers + $3,
        score = CASE 
          WHEN EXCLUDED.total_questions + $2 > 0 
          THEN ROUND((EXCLUDED.correct_answers + $3)::decimal / (EXCLUDED.total_questions + $2) * 100, 2)
          ELSE 0 
        END,
        last_attempted = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    `, [userId, total, correct, score]);

    res.json({ 
      message: 'Quiz completed successfully',
      score,
      correct,
      total
    });

  } catch (error) {
    console.error('Error completing quiz:', error);
    res.status(500).json({ error: 'Failed to complete quiz' });
  }
});

// Get user progress
router.get('/progress', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'SELECT * FROM coc3_user_progress WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.json({
        total_questions: 0,
        correct_answers: 0,
        score: 0,
        last_attempted: null
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

module.exports = router;
