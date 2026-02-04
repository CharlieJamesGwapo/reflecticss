const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// Initialize COC 3 with comprehensive Wireless Basics content
router.get('/initialize', async (req, res) => {
  try {
    // Add missing columns if they don't exist
    await pool.query(
      'ALTER TABLE coc3_terms ADD COLUMN IF NOT EXISTS abbreviation VARCHAR(50)'
    );
    await pool.query(
      'ALTER TABLE coc3_terms ADD COLUMN IF NOT EXISTS image_url VARCHAR(500)'
    );

    // Step 1: Add comprehensive Wireless Basics terms
    const allTerms = [
      // WIRELESS BASICS CATEGORY
      {
        name: 'Wireless Technology',
        abbreviation: null,
        definition: 'A method of communication that lets devices send information without wires by using radio or infrared signals.',
        category: 'Wireless Basics',
        example: 'Wi-Fi, Bluetooth, and cellular networks are examples of wireless technology.',
        image: null
      },
      {
        name: 'SSID',
        abbreviation: 'Service Set Identifier',
        definition: 'The unique name assigned to a Wi‑Fi network so devices know which network to join.',
        category: 'Wireless Basics',
        example: 'When you look at available Wi-Fi networks on your phone, "HomeWiFi_Network" is an SSID.',
        image: null
      },
      {
        name: 'Wireless Network',
        abbreviation: null,
        definition: 'A network that allows computers and devices to connect using signals instead of cables.',
        category: 'Wireless Basics',
        example: 'Your home Wi-Fi network that connects your phone, laptop, and smart TV.',
        image: null
      },
      {
        name: 'WPAN',
        abbreviation: 'Wireless Personal Area Network',
        definition: 'A very small wireless network used for personal devices like headsets or smartwatches.',
        category: 'Wireless Basics',
        example: 'Bluetooth connection between your phone and wireless earbuds.',
        image: null
      },
      {
        name: 'WLAN',
        abbreviation: 'Wireless Local Area Network',
        definition: 'A Wi‑Fi network inside a home, school, or building that allows devices to access the internet.',
        category: 'Wireless Basics',
        example: 'School Wi-Fi network covering classrooms and library.',
        image: null
      },

      // NETWORK PROTOCOLS & OSI CATEGORY
      {
        name: 'Protocol',
        abbreviation: null,
        definition: 'A set of rules that computers follow so they can properly send, receive, and understand data.',
        category: 'Network Protocols & OSI',
        example: 'HTTP protocol governs how web browsers communicate with web servers.',
        image: null
      },
      {
        name: 'OSI Model',
        abbreviation: 'Open Systems Interconnection Model',
        definition: 'A seven‑layer system that explains how data travels from one device to another.',
        category: 'Network Protocols & OSI',
        example: 'Application layer, Transport layer, Network layer are part of the OSI model.',
        image: null
      },
      {
        name: 'Ethernet',
        abbreviation: null,
        definition: 'A wired network method that controls how data moves through cables.',
        category: 'Network Protocols & OSI',
        example: 'Ethernet cables connecting computers to office network switches.',
        image: null
      },
      {
        name: 'CSMA/CD',
        abbreviation: 'Carrier Sense Multiple Access with Collision Detection',
        definition: 'A rule where devices check if the line is clear before sending data to prevent collisions.',
        category: 'Network Protocols & OSI',
        example: 'Ethernet networks use CSMA/CD to avoid data packet collisions.',
        image: null
      },
      {
        name: 'TCP/IP',
        abbreviation: 'Transmission Control Protocol/Internet Protocol',
        definition: 'The main protocol pair that ensures reliable data delivery and correct addressing.',
        category: 'Network Protocols & OSI',
        example: 'All internet communication relies on TCP/IP for data transmission.',
        image: null
      },

      // ADVANCED PROTOCOLS & WIRELESS TYPES CATEGORY
      {
        name: 'DNS',
        abbreviation: 'Domain Name System',
        definition: 'A system that translates website names into numeric IP addresses.',
        category: 'Advanced Protocols & Wireless Types',
        example: 'DNS converts www.google.com to 172.217.14.228.',
        image: null
      },
      {
        name: 'FTP',
        abbreviation: 'File Transfer Protocol',
        definition: 'A protocol used to move or download files from one computer to another.',
        category: 'Advanced Protocols & Wireless Types',
        example: 'Uploading website files to a web server using FTP.',
        image: null
      },
      {
        name: 'HTTP',
        abbreviation: 'Hypertext Transfer Protocol',
        definition: 'The protocol used by web browsers to load webpages.',
        category: 'Advanced Protocols & Wireless Types',
        example: 'Your browser uses HTTP to fetch and display web pages.',
        image: null
      },
      {
        name: 'Wireless Mesh',
        abbreviation: null,
        definition: 'A network where devices help pass the signal, creating stronger and wider coverage.',
        category: 'Advanced Protocols & Wireless Types',
        example: 'Smart home devices extending Wi-Fi coverage throughout a house.',
        image: null
      },
      {
        name: 'WMAN/WWAN',
        abbreviation: 'Wireless Metropolitan Area Network / Wireless Wide Area Network',
        definition: 'Wireless networks that cover larger areas such as cities or regions.',
        category: 'Advanced Protocols & Wireless Types',
        example: 'Cellular networks providing 4G/5G coverage across cities.',
        image: null
      },

      // WIRELESS SIGNAL PROBLEMS CATEGORY
      {
        name: 'Interference',
        abbreviation: null,
        definition: 'When other devices or signals disrupt Wi‑Fi, making it slow or unstable.',
        category: 'Wireless Signal Problems',
        example: 'Microwave oven interfering with Wi-Fi signal during operation.',
        image: null
      },
      {
        name: 'Absorption/Reflection',
        abbreviation: null,
        definition: 'Walls or metal objects weaken or bounce wireless signals.',
        category: 'Wireless Signal Problems',
        example: 'Wi-Fi signal weakening when passing through concrete walls.',
        image: null
      },
      {
        name: 'Multipath Fading',
        abbreviation: null,
        definition: 'When signals take different paths and cancel each other, causing weak spots.',
        category: 'Wireless Signal Problems',
        example: 'Wi-Fi dead spots in certain areas of a room due to signal interference.',
        image: null
      },
      {
        name: 'Hidden Node Problem',
        abbreviation: null,
        definition: 'When devices cannot detect each other, causing connection problems.',
        category: 'Wireless Signal Problems',
        example: 'Two devices transmitting simultaneously because they cannot sense each other.',
        image: null
      },
      {
        name: 'Shared Resource Issue',
        abbreviation: null,
        definition: 'When too many users are connected, resulting in much slower speeds.',
        category: 'Wireless Signal Problems',
        example: 'Wi-Fi slowing down when many family members stream videos simultaneously.',
        image: null
      },

      // ROUTER & WI‑FI CONFIGURATION CATEGORY
      {
        name: 'WPA2',
        abbreviation: 'Wi‑Fi Protected Access 2',
        definition: 'A strong security system that protects Wi‑Fi networks from intruders.',
        category: 'Router & Wi‑Fi Configuration',
        example: 'Setting WPA2 password on home router to secure Wi-Fi network.',
        image: null
      },
      {
        name: 'WEP',
        abbreviation: 'Wired Equivalent Privacy',
        definition: 'An older, weaker security method no longer recommended for modern use.',
        category: 'Router & Wi‑Fi Configuration',
        example: 'Legacy wireless networks still using outdated WEP encryption.',
        image: null
      },
      {
        name: 'Router Admin Page',
        abbreviation: null,
        definition: 'A website you access using the router\'s IP to change settings.',
        category: 'Router & Wi‑Fi Configuration',
        example: 'Accessing 192.168.1.1 to configure home network settings.',
        image: null
      },
      {
        name: 'SSID and Password Change',
        abbreviation: 'Service Set Identifier',
        definition: 'Renaming your Wi‑Fi and creating a new password to increase safety.',
        category: 'Router & Wi‑Fi Configuration',
        example: 'Changing default SSID "Linksys" to "MyHomeNetwork" with strong password.',
        image: null
      },
      {
        name: 'Static IP',
        abbreviation: 'Static Internet Protocol Address',
        definition: 'A permanent address used for routers or repeaters to keep them easy to access.',
        category: 'Router & Wi‑Fi Configuration',
        example: 'Setting router IP to 192.168.1.1 for consistent access.',
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

    // Step 3: Add comprehensive quiz questions
    const quizQuestions = [
      // WIRELESS BASICS QUESTIONS
      {
        question: 'You want to connect your laptop to the internet without any cables. What technology allows devices to send information using radio signals?',
        category: 'Wireless Basics',
        difficulty: 'easy',
        choices: [
          { text: 'Ethernet', correct: false },
          { text: 'Wireless Technology', correct: true },
          { text: 'Fiber Optic', correct: false },
          { text: 'Coaxial Cable', correct: false }
        ]
      },
      {
        question: 'At a coffee shop, you see multiple Wi-Fi networks on your phone. How do you identify which network belongs to the coffee shop?',
        category: 'Wireless Basics',
        difficulty: 'easy',
        choices: [
          { text: 'MAC Address', correct: false },
          { text: 'SSID', correct: true },
          { text: 'IP Address', correct: false },
          { text: 'BSSID', correct: false }
        ]
      },
      {
        question: 'Your smartwatch connects to your phone without any cables. What type of wireless network is this?',
        category: 'Wireless Basics',
        difficulty: 'easy',
        choices: [
          { text: 'WLAN', correct: false },
          { text: 'WMAN', correct: false },
          { text: 'WWAN', correct: false },
          { text: 'WPAN', correct: true }
        ]
      },
      {
        question: 'Your school provides Wi-Fi that covers all classrooms and the library. What type of wireless network is this?',
        category: 'Wireless Basics',
        difficulty: 'easy',
        choices: [
          { text: 'WPAN', correct: false },
          { text: 'WLAN', correct: true },
          { text: 'WMAN', correct: false },
          { text: 'WWAN', correct: false }
        ]
      },
      {
        question: 'What allows computers and devices to connect using signals instead of cables?',
        category: 'Wireless Basics',
        difficulty: 'easy',
        choices: [
          { text: 'Wired Network', correct: false },
          { text: 'Wireless Network', correct: true },
          { text: 'Hybrid Network', correct: false },
          { text: 'Virtual Network', correct: false }
        ]
      },

      // NETWORK PROTOCOLS & OSI QUESTIONS
      {
        question: 'Your web browser needs to communicate with a web server. What set of rules governs this communication?',
        category: 'Network Protocols & OSI',
        difficulty: 'easy',
        choices: [
          { text: 'Hardware', correct: false },
          { text: 'Protocol', correct: true },
          { text: 'Driver', correct: false },
          { text: 'Firmware', correct: false }
        ]
      },
      {
        question: 'A network engineer is explaining how data travels from one device to another using seven layers. What model is being described?',
        category: 'Network Protocols & OSI',
        difficulty: 'medium',
        choices: [
          { text: 'TCP Model', correct: false },
          { text: 'OSI Model', correct: true },
          { text: 'HTTP Model', correct: false },
          { text: 'IP Model', correct: false }
        ]
      },
      {
        question: 'In an office, computers are connected using cables that control how data moves through them. What wired network method is being used?',
        category: 'Network Protocols & OSI',
        difficulty: 'easy',
        choices: [
          { text: 'Wi-Fi', correct: false },
          { text: 'Bluetooth', correct: false },
          { text: 'Ethernet', correct: true },
          { text: 'Cellular', correct: false }
        ]
      },
      {
        question: 'Before sending data on an Ethernet network, devices check if the line is clear to prevent collisions. What rule is this?',
        category: 'Network Protocols & OSI',
        difficulty: 'medium',
        choices: [
          { text: 'TCP/IP', correct: false },
          { text: 'HTTP', correct: false },
          { text: 'CSMA/CD', correct: true },
          { text: 'FTP', correct: false }
        ]
      },
      {
        question: 'All internet communication relies on what main protocol pair that ensures reliable data delivery and correct addressing?',
        category: 'Network Protocols & OSI',
        difficulty: 'easy',
        choices: [
          { text: 'HTTP/HTTPS', correct: false },
          { text: 'FTP/SFTP', correct: false },
          { text: 'TCP/IP', correct: true },
          { text: 'SMTP/POP3', correct: false }
        ]
      },

      // ADVANCED PROTOCOLS & WIRELESS TYPES QUESTIONS
      {
        question: 'You type www.google.com in your browser, and it gets converted to an IP address. What system performs this translation?',
        category: 'Advanced Protocols & Wireless Types',
        difficulty: 'easy',
        choices: [
          { text: 'HTTP', correct: false },
          { text: 'FTP', correct: false },
          { text: 'DNS', correct: true },
          { text: 'TCP', correct: false }
        ]
      },
      {
        question: 'You need to upload website files to a web server. What protocol is specifically designed for file transfer?',
        category: 'Advanced Protocols & Wireless Types',
        difficulty: 'easy',
        choices: [
          { text: 'HTTP', correct: false },
          { text: 'FTP', correct: true },
          { text: 'SSH', correct: false },
          { text: 'Telnet', correct: false }
        ]
      },
      {
        question: 'Your web browser uses what protocol to load and display web pages?',
        category: 'Advanced Protocols & Wireless Types',
        difficulty: 'easy',
        choices: [
          { text: 'FTP', correct: false },
          { text: 'HTTP', correct: true },
          { text: 'SMTP', correct: false },
          { text: 'DNS', correct: false }
        ]
      },
      {
        question: 'In a smart home, devices help extend Wi-Fi coverage by passing signals to each other. What type of network is this?',
        category: 'Advanced Protocols & Wireless Types',
        difficulty: 'medium',
        choices: [
          { text: 'Traditional Network', correct: false },
          { text: 'Wireless Mesh', correct: true },
          { text: 'Point-to-Point', correct: false },
          { text: 'Star Network', correct: false }
        ]
      },
      {
        question: 'Cellular networks that provide 4G/5G coverage across entire cities are examples of what type of wireless network?',
        category: 'Advanced Protocols & Wireless Types',
        difficulty: 'medium',
        choices: [
          { text: 'WPAN', correct: false },
          { text: 'WLAN', correct: false },
          { text: 'WMAN/WWAN', correct: true },
          { text: 'VPN', correct: false }
        ]
      },

      // WIRELESS SIGNAL PROBLEMS QUESTIONS
      {
        question: 'Your Wi-Fi becomes slow and unstable when you use the microwave. What wireless problem is occurring?',
        category: 'Wireless Signal Problems',
        difficulty: 'easy',
        choices: [
          { text: 'Signal Blocking', correct: false },
          { text: 'Interference', correct: true },
          { text: 'Disconnection', correct: false },
          { text: 'Overload', correct: false }
        ]
      },
      {
        question: 'Your Wi-Fi signal weakens significantly when passing through concrete walls. What wireless problem causes this?',
        category: 'Wireless Signal Problems',
        difficulty: 'medium',
        choices: [
          { text: 'Encryption', correct: false },
          { text: 'Absorption/Reflection', correct: true },
          { text: 'Compression', correct: false },
          { text: 'Amplification', correct: false }
        ]
      },
      {
        question: 'You notice certain areas in your room have no Wi-Fi signal due to signals canceling each other out. What problem is this?',
        category: 'Wireless Signal Problems',
        difficulty: 'hard',
        choices: [
          { text: 'Signal Loss', correct: false },
          { text: 'Multipath Fading', correct: true },
          { text: 'Frequency Drop', correct: false },
          { text: 'Bandwidth Reduction', correct: false }
        ]
      },
      {
        question: 'Two wireless devices are transmitting simultaneously because they cannot detect each other, causing connection problems. What is this called?',
        category: 'Wireless Signal Problems',
        difficulty: 'hard',
        choices: [
          { text: 'Hidden Node Problem', correct: true },
          { text: 'Exposed Node Problem', correct: false },
          { text: 'Signal Collision', correct: false },
          { text: 'Network Conflict', correct: false }
        ]
      },
      {
        question: 'Your Wi-Fi becomes much slower when many family members are streaming videos simultaneously. What issue is this?',
        category: 'Wireless Signal Problems',
        difficulty: 'easy',
        choices: [
          { text: 'Shared Resource Issue', correct: true },
          { text: 'Network Failure', correct: false },
          { text: 'Signal Loss', correct: false },
          { text: 'Device Limit', correct: false }
        ]
      },

      // ROUTER & WI‑FI CONFIGURATION QUESTIONS
      {
        question: 'You want to secure your home Wi-Fi network from intruders. What strong security system should you use?',
        category: 'Router & Wi‑Fi Configuration',
        difficulty: 'easy',
        choices: [
          { text: 'WEP', correct: false },
          { text: 'WPA2', correct: true },
          { text: 'Open Network', correct: false },
          { text: 'WEP2', correct: false }
        ]
      },
      {
        question: 'What older, weaker security method is no longer recommended for modern Wi-Fi networks?',
        category: 'Router & Wi‑Fi Configuration',
        difficulty: 'easy',
        choices: [
          { text: 'WPA2', correct: false },
          { text: 'WPA3', correct: false },
          { text: 'WEP', correct: true },
          { text: 'WPS', correct: false }
        ]
      },
      {
        question: 'You need to change your router settings by accessing a website using the router\'s IP address. What are you accessing?',
        category: 'Router & Wi‑Fi Configuration',
        difficulty: 'easy',
        choices: [
          { text: 'Router Admin Page', correct: true },
          { text: 'Network Status', correct: false },
          { text: 'Device Manager', correct: false },
          { text: 'Control Panel', correct: false }
        ]
      },
      {
        question: 'To increase security, you rename your Wi‑Fi from the default name and create a new password. What is this process called?',
        category: 'Router & Wi‑Fi Configuration',
        difficulty: 'medium',
        choices: [
          { text: 'Network Reset', correct: false },
          { text: 'SSID and Password Change', correct: true },
          { text: 'Router Update', correct: false },
          { text: 'Signal Boost', correct: false }
        ]
      },
      {
        question: 'You set your router to always use the IP address 192.168.1.1 so you can easily access it. What type of address is this?',
        category: 'Router & Wi‑Fi Configuration',
        difficulty: 'medium',
        choices: [
          { text: 'Dynamic IP', correct: false },
          { text: 'Static IP', correct: true },
          { text: 'Random IP', correct: false },
          { text: 'Temporary IP', correct: false }
        ]
      },

      // ADDITIONAL COMPREHENSIVE QUIZ QUESTIONS FROM USER
      {
        question: 'Maria is setting up a Wi-Fi network in her home. She wants her smartphone to connect to the correct network. Which term represents the name her phone will look for?',
        category: 'Wireless Basics',
        difficulty: 'easy',
        choices: [
          { text: 'WLAN', correct: false },
          { text: 'SSID', correct: true },
          { text: 'WPAN', correct: false },
          { text: 'Wireless Mesh', correct: false }
        ]
      },
      {
        question: 'Juan wants to connect his smartwatch and wireless headset without using cables. Which type of network should he use?',
        category: 'Wireless Basics',
        difficulty: 'easy',
        choices: [
          { text: 'WLAN', correct: false },
          { text: 'WPAN', correct: true },
          { text: 'WMAN', correct: false },
          { text: 'Wireless Mesh', correct: false }
        ]
      },
      {
        question: 'A school has multiple computers in different rooms that need to connect to the internet without using Ethernet cables. What type of network do they likely have?',
        category: 'Wireless Basics',
        difficulty: 'easy',
        choices: [
          { text: 'WPAN', correct: false },
          { text: 'Wireless Network', correct: true },
          { text: 'Ethernet', correct: false },
          { text: 'TCP/IP', correct: false }
        ]
      },
      {
        question: 'A computer needs to send a file to another computer across the internet and ensure it arrives correctly. Which protocol pair helps with this?',
        category: 'Network Protocols & OSI',
        difficulty: 'easy',
        choices: [
          { text: 'CSMA/CD', correct: false },
          { text: 'TCP/IP', correct: true },
          { text: 'HTTP', correct: false },
          { text: 'FTP', correct: false }
        ]
      },
      {
        question: 'Before sending data over a wired network, a device checks if the line is free to avoid collisions. Which rule is this?',
        category: 'Network Protocols & OSI',
        difficulty: 'medium',
        choices: [
          { text: 'Ethernet', correct: false },
          { text: 'CSMA/CD', correct: true },
          { text: 'OSI Model', correct: false },
          { text: 'Protocol', correct: false }
        ]
      },
      {
        question: 'Liza wants to understand how data travels from her computer to a website. She studies a seven-layer model. What is this model called?',
        category: 'Network Protocols & OSI',
        difficulty: 'medium',
        choices: [
          { text: 'TCP/IP', correct: false },
          { text: 'OSI Model', correct: true },
          { text: 'DNS', correct: false },
          { text: 'FTP', correct: false }
        ]
      },
      {
        question: 'Peter wants to access a website by typing its name instead of its IP address. Which system translates the name into a number?',
        category: 'Advanced Protocols & Wireless Types',
        difficulty: 'easy',
        choices: [
          { text: 'FTP', correct: false },
          { text: 'HTTP', correct: false },
          { text: 'DNS', correct: true },
          { text: 'CSMA/CD', correct: false }
        ]
      },
      {
        question: 'A city wants to provide Wi-Fi coverage in public areas, where multiple devices help pass the signal to reach farther. Which type of network is this?',
        category: 'Advanced Protocols & Wireless Types',
        difficulty: 'medium',
        choices: [
          { text: 'WLAN', correct: false },
          { text: 'WPAN', correct: false },
          { text: 'Wireless Mesh', correct: true },
          { text: 'WEP', correct: false }
        ]
      },
      {
        question: 'A company wants to allow employees to download large files from the main server. Which protocol should they use?',
        category: 'Advanced Protocols & Wireless Types',
        difficulty: 'easy',
        choices: [
          { text: 'HTTP', correct: false },
          { text: 'FTP', correct: true },
          { text: 'DNS', correct: false },
          { text: 'TCP/IP', correct: false }
        ]
      },
      {
        question: 'A student complains that the Wi-Fi in the corner of the classroom is weak. The signal might be bouncing off walls or metal objects. Which problem is this?',
        category: 'Wireless Signal Problems',
        difficulty: 'medium',
        choices: [
          { text: 'Multipath Fading', correct: false },
          { text: 'Absorption/Reflection', correct: true },
          { text: 'Hidden Node Problem', correct: false },
          { text: 'Shared Resource Issue', correct: false }
        ]
      },
      {
        question: 'Several users notice their internet is slow because too many devices are connected at once. What is likely the cause?',
        category: 'Wireless Signal Problems',
        difficulty: 'easy',
        choices: [
          { text: 'Interference', correct: false },
          { text: 'Hidden Node Problem', correct: false },
          { text: 'Shared Resource Issue', correct: true },
          { text: 'Multipath Fading', correct: false }
        ]
      },
      {
        question: 'Two devices cannot detect each other in a network, causing connection failures. Which issue is this?',
        category: 'Wireless Signal Problems',
        difficulty: 'hard',
        choices: [
          { text: 'Interference', correct: false },
          { text: 'Hidden Node Problem', correct: true },
          { text: 'Multipath Fading', correct: false },
          { text: 'Absorption/Reflection', correct: false }
        ]
      },
      {
        question: 'Alex wants to secure his Wi-Fi with a modern, strong encryption system. Which should he use?',
        category: 'Router & Wi‑Fi Configuration',
        difficulty: 'easy',
        choices: [
          { text: 'WEP', correct: false },
          { text: 'WPA2', correct: true },
          { text: 'SSID', correct: false },
          { text: 'Static IP', correct: false }
        ]
      },
      {
        question: 'The router has a default Wi-Fi name and password. What should the user do to increase security?',
        category: 'Router & Wi‑Fi Configuration',
        difficulty: 'medium',
        choices: [
          { text: 'Set Static IP', correct: false },
          { text: 'Use WEP', correct: false },
          { text: 'Change SSID and Password', correct: true },
          { text: 'Enable CSMA/CD', correct: false }
        ]
      },
      {
        question: 'The network administrator assigns a permanent IP to a router to make it easy to access. What is this called?',
        category: 'Router & Wi‑Fi Configuration',
        difficulty: 'medium',
        choices: [
          { text: 'Static IP', correct: true },
          { text: 'SSID', correct: false },
          { text: 'WPA2', correct: false },
          { text: 'Ethernet', correct: false }
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
      message: 'COC 3 comprehensive Wireless Basics initialized successfully',
      termsAdded: allTerms.length,
      questionsAdded: quizQuestions.length,
      categories: [
        'Wireless Basics',
        'Network Protocols & OSI',
        'Advanced Protocols & Wireless Types',
        'Wireless Signal Problems',
        'Router & Wi‑Fi Configuration'
      ]
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
