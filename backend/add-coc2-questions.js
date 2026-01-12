const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

// COC2 Part 2 Questions - Network Topology, Configuration, Location Types, Sharing, Security
const questions = [
  // Network Topology Questions
  {
    question_text: "Your teacher asks the class to redesign the computer lab, focusing on how devices are arranged and connected. What concept are you being asked to work on?",
    category: "Network Topology",
    difficulty: "Easy",
    choices: [
      { choice_text: "Network Security", is_correct: false },
      { choice_text: "Network Topology", is_correct: true },
      { choice_text: "Printer Sharing", is_correct: false },
      { choice_text: "IP Address", is_correct: false }
    ]
  },
  {
    question_text: "In a small shop, all computers are connected to a single main cable. When the cable is damaged, the whole network stops working. What topology is this?",
    category: "Network Topology",
    difficulty: "Easy",
    choices: [
      { choice_text: "Mesh", is_correct: false },
      { choice_text: "Bus", is_correct: true },
      { choice_text: "Star", is_correct: false },
      { choice_text: "Hybrid", is_correct: false }
    ]
  },
  {
    question_text: "A company uses a network where each device passes the message to the next one in a circular path. What topology is being used?",
    category: "Network Topology",
    difficulty: "Easy",
    choices: [
      { choice_text: "Ring", is_correct: true },
      { choice_text: "Star", is_correct: false },
      { choice_text: "Tree", is_correct: false },
      { choice_text: "Bus", is_correct: false }
    ]
  },
  {
    question_text: "A school network uses a central switch to connect all computers. If the switch fails, all computers lose connection. What topology is this?",
    category: "Network Topology",
    difficulty: "Easy",
    choices: [
      { choice_text: "Mesh", is_correct: false },
      { choice_text: "Star", is_correct: true },
      { choice_text: "Hybrid", is_correct: false },
      { choice_text: "Tree", is_correct: false }
    ]
  },
  {
    question_text: "In a military base, each device is connected to many other devices to ensure communication continues even if one path fails. What topology is this?",
    category: "Network Topology",
    difficulty: "Easy",
    choices: [
      { choice_text: "Mesh", is_correct: true },
      { choice_text: "Ring", is_correct: false },
      { choice_text: "Bus", is_correct: false },
      { choice_text: "LAN", is_correct: false }
    ]
  },
  {
    question_text: "A network starts with a main server, then branches out into smaller connected groups of computers. What topology is this?",
    category: "Network Topology",
    difficulty: "Easy",
    choices: [
      { choice_text: "Star", is_correct: false },
      { choice_text: "Tree", is_correct: true },
      { choice_text: "Bus", is_correct: false },
      { choice_text: "Hybrid", is_correct: false }
    ]
  },
  {
    question_text: "A university uses both star and ring topologies in different buildings, combining them together. What topology is this called?",
    category: "Network Topology",
    difficulty: "Easy",
    choices: [
      { choice_text: "Mesh", is_correct: false },
      { choice_text: "Hybrid", is_correct: true },
      { choice_text: "Bus", is_correct: false },
      { choice_text: "Tree", is_correct: false }
    ]
  },
  // Network Configuration Questions
  {
    question_text: "A computer shop with 12 PCs shares internet and files within the shop. What type of network is this?",
    category: "Network Configuration",
    difficulty: "Easy",
    choices: [
      { choice_text: "WAN", is_correct: false },
      { choice_text: "LAN", is_correct: true },
      { choice_text: "Public Network", is_correct: false },
      { choice_text: "Domain", is_correct: false }
    ]
  },
  {
    question_text: "A company connects offices located in Manila, Cebu, and Davao through a single network. What type of network is used?",
    category: "Network Configuration",
    difficulty: "Easy",
    choices: [
      { choice_text: "LAN", is_correct: false },
      { choice_text: "WAN", is_correct: true },
      { choice_text: "Tree", is_correct: false },
      { choice_text: "Mesh", is_correct: false }
    ]
  },
  {
    question_text: "Your phone can't connect to Wi-Fi because it has no assigned number that identifies it in the network. What is missing?",
    category: "Network Configuration",
    difficulty: "Easy",
    choices: [
      { choice_text: "MAC Address", is_correct: false },
      { choice_text: "DHCP", is_correct: false },
      { choice_text: "IP Address", is_correct: true },
      { choice_text: "Firewall", is_correct: false }
    ]
  },
  {
    question_text: "A home router automatically assigns IP addresses to all phones and laptops that connect. What feature is doing this?",
    category: "Network Configuration",
    difficulty: "Easy",
    choices: [
      { choice_text: "Firewall", is_correct: false },
      { choice_text: "DHCP Server", is_correct: true },
      { choice_text: "Proxy", is_correct: false },
      { choice_text: "IPv4", is_correct: false }
    ]
  },
  {
    question_text: "A school blocks a specific student's device from connecting to Wi-Fi by using its unique hardware identifier. What identifier was used?",
    category: "Network Configuration",
    difficulty: "Easy",
    choices: [
      { choice_text: "IP Address", is_correct: false },
      { choice_text: "MAC Address", is_correct: true },
      { choice_text: "Subnet Mask", is_correct: false },
      { choice_text: "Domain Name", is_correct: false }
    ]
  },
  {
    question_text: "Your teacher asks you to identify the type of internet addressing that looks like '192.168.1.1.' What is this?",
    category: "Network Configuration",
    difficulty: "Easy",
    choices: [
      { choice_text: "IPv4", is_correct: true },
      { choice_text: "IPv6", is_correct: false },
      { choice_text: "DHCP", is_correct: false },
      { choice_text: "WAN", is_correct: false }
    ]
  },
  {
    question_text: "A network admin divides a large network into smaller sections so devices stay organized and secure. What tool does he use?",
    category: "Network Configuration",
    difficulty: "Easy",
    choices: [
      { choice_text: "IP Address", is_correct: false },
      { choice_text: "Subnet Mask", is_correct: true },
      { choice_text: "MAC Address", is_correct: false },
      { choice_text: "Firewall", is_correct: false }
    ]
  },
  // Network Location Types Questions
  {
    question_text: "In your house, all phones and smart TVs are connected through one Wi-Fi. What type of network is this?",
    category: "Network Location Types",
    difficulty: "Easy",
    choices: [
      { choice_text: "Work Network", is_correct: false },
      { choice_text: "Public Network", is_correct: false },
      { choice_text: "Home Network", is_correct: true },
      { choice_text: "Domain Network", is_correct: false }
    ]
  },
  {
    question_text: "A company connects computers to access shared printers, files, and employee data inside the office. What network is this?",
    category: "Network Location Types",
    difficulty: "Easy",
    choices: [
      { choice_text: "Home Network", is_correct: false },
      { choice_text: "Work Network", is_correct: true },
      { choice_text: "Domain Network", is_correct: false },
      { choice_text: "WAN", is_correct: false }
    ]
  },
  {
    question_text: "You connect to free Wi-Fi at a coffee shop. This type of network is called:",
    category: "Network Location Types",
    difficulty: "Easy",
    choices: [
      { choice_text: "Domain", is_correct: false },
      { choice_text: "LAN", is_correct: false },
      { choice_text: "Public Network", is_correct: true },
      { choice_text: "Tree", is_correct: false }
    ]
  },
  {
    question_text: "A school has a server that controls the login access of all students and teachers. What type of network is this?",
    category: "Network Location Types",
    difficulty: "Easy",
    choices: [
      { choice_text: "Public", is_correct: false },
      { choice_text: "Home", is_correct: false },
      { choice_text: "Domain", is_correct: true },
      { choice_text: "LAN", is_correct: false }
    ]
  },
  // Network Sharing Questions
  {
    question_text: "Three classmates work on a project using the same folder accessible over the school network. What is this called?",
    category: "Network Sharing",
    difficulty: "Easy",
    choices: [
      { choice_text: "Printer Sharing", is_correct: false },
      { choice_text: "File Sharing", is_correct: true },
      { choice_text: "Domain Network", is_correct: false },
      { choice_text: "WAN", is_correct: false }
    ]
  },
  {
    question_text: "In an office, all employees can print from the same printer over the network. What is this?",
    category: "Network Sharing",
    difficulty: "Easy",
    choices: [
      { choice_text: "LAN", is_correct: false },
      { choice_text: "Printer Sharing", is_correct: true },
      { choice_text: "Proxy", is_correct: false },
      { choice_text: "Firewall", is_correct: false }
    ]
  },
  // Network Security Questions
  {
    question_text: "A business installs tools to protect its network from hackers. What is this called?",
    category: "Network Security",
    difficulty: "Easy",
    choices: [
      { choice_text: "IP Addressing", is_correct: false },
      { choice_text: "Network Security", is_correct: true },
      { choice_text: "File Sharing", is_correct: false },
      { choice_text: "Public Network", is_correct: false }
    ]
  },
  {
    question_text: "A downloaded file started damaging system files and spreading on its own to other computers. What is this?",
    category: "Network Security",
    difficulty: "Easy",
    choices: [
      { choice_text: "Firewall", is_correct: false },
      { choice_text: "Virus", is_correct: true },
      { choice_text: "Proxy", is_correct: false },
      { choice_text: "Subnet", is_correct: false }
    ]
  },
  {
    question_text: "Your router blocks suspicious incoming traffic to protect your data. What is this feature?",
    category: "Network Security",
    difficulty: "Easy",
    choices: [
      { choice_text: "Subnet Mask", is_correct: false },
      { choice_text: "Virus Protection", is_correct: false },
      { choice_text: "Firewall", is_correct: true },
      { choice_text: "Mesh Topology", is_correct: false }
    ]
  },
  {
    question_text: "Your company uses a firewall that decides which applications should be allowed to send or receive traffic. What type is this?",
    category: "Network Security",
    difficulty: "Easy",
    choices: [
      { choice_text: "Proxy Firewall", is_correct: false },
      { choice_text: "Application Layer Firewall", is_correct: true },
      { choice_text: "Inbound Rule", is_correct: false },
      { choice_text: "WAN Security", is_correct: false }
    ]
  },
  {
    question_text: "A system checks app traffic and blocks certain apps from connecting to the internet. What firewall is used?",
    category: "Network Security",
    difficulty: "Easy",
    choices: [
      { choice_text: "Application Firewall", is_correct: true },
      { choice_text: "Mesh Firewall", is_correct: false },
      { choice_text: "Proxy Firewall", is_correct: false },
      { choice_text: "Outbound Rule", is_correct: false }
    ]
  },
  {
    question_text: "Your school uses a firewall that hides the internal devices by acting as a middleman between the user and the internet. What firewall is this?",
    category: "Network Security",
    difficulty: "Easy",
    choices: [
      { choice_text: "Outbound", is_correct: false },
      { choice_text: "Proxy Firewall", is_correct: true },
      { choice_text: "Application Layer", is_correct: false },
      { choice_text: "Virus Filter", is_correct: false }
    ]
  },
  {
    question_text: "Your laptop blocks all unknown connections that try to enter the system. What is being used?",
    category: "Network Security",
    difficulty: "Easy",
    choices: [
      { choice_text: "Outbound Rules", is_correct: false },
      { choice_text: "Inbound Rules", is_correct: true },
      { choice_text: "MAC Filtering", is_correct: false },
      { choice_text: "DHCP", is_correct: false }
    ]
  },
  {
    question_text: "A computer is allowed to connect to websites except social media, which is blocked. What rule controls this?",
    category: "Network Security",
    difficulty: "Easy",
    choices: [
      { choice_text: "Inbound", is_correct: false },
      { choice_text: "Outbound", is_correct: true },
      { choice_text: "Subnet", is_correct: false },
      { choice_text: "Printer Sharing", is_correct: false }
    ]
  },
  {
    question_text: "Two computers in a company exchange encrypted data to stay protected from unauthorized access. What rule is used?",
    category: "Network Security",
    difficulty: "Easy",
    choices: [
      { choice_text: "Firewall Rules", is_correct: false },
      { choice_text: "Connection Security Rules", is_correct: true },
      { choice_text: "WAN Rules", is_correct: false },
      { choice_text: "Proxy Controls", is_correct: false }
    ]
  }
];

async function addCOC2Questions() {
  try {
    console.log('Adding COC2 Part 2 questions to database...');
    
    // First, create tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS coc2_quiz_questions (
        id SERIAL PRIMARY KEY,
        question_text TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        difficulty VARCHAR(50) DEFAULT 'Easy',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS coc2_quiz_choices (
        id SERIAL PRIMARY KEY,
        question_id INTEGER REFERENCES coc2_quiz_questions(id) ON DELETE CASCADE,
        choice_text TEXT NOT NULL,
        is_correct BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Tables created/verified successfully');

    // Add questions and choices
    for (const question of questions) {
      // Insert question
      const questionResult = await pool.query(
        'INSERT INTO coc2_quiz_questions (question_text, category, difficulty) VALUES ($1, $2, $3) RETURNING id',
        [question.question_text, question.category, question.difficulty]
      );
      
      const questionId = questionResult.rows[0].id;
      console.log(`Added question: ${question.category} - ID: ${questionId}`);
      
      // Insert choices
      for (const choice of question.choices) {
        await pool.query(
          'INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES ($1, $2, $3)',
          [questionId, choice.choice_text, choice.is_correct]
        );
      }
    }

    console.log('Successfully added all COC2 Part 2 questions!');
    
    // Verify the questions were added
    const countResult = await pool.query('SELECT COUNT(*) as count FROM coc2_quiz_questions');
    console.log(`Total questions in database: ${countResult.rows[0].count}`);
    
  } catch (error) {
    console.error('Error adding questions:', error);
  } finally {
    await pool.end();
  }
}

addCOC2Questions();
