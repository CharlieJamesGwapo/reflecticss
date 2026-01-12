const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

// COC2 Week 8-10 Terms for Reviewer Questions
const questions = [
  // NETWORK DEVICES
  {
    question_text: "You're setting up internet access for a small office using a DSL connection through phone lines. What device do you need to convert digital signals from computers into analog signals for transmission and vice versa?",
    category: "Network Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Router", is_correct: false },
      { choice_text: "Switch", is_correct: false },
      { choice_text: "Modem", is_correct: true },
      { choice_text: "Hub", is_correct: false }
    ]
  },
  {
    question_text: "Your new laptop has a USB-C port, but the office projector only accepts HDMI. What device would you use to connect them and ensure compatibility?",
    category: "Network Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Router", is_correct: false },
      { choice_text: "Adapter", is_correct: true },
      { choice_text: "Switch", is_correct: false },
      { choice_text: "Repeater", is_correct: false }
    ]
  },
  {
    question_text: "A company wants to connect multiple devices (wired and wireless) to the internet while ensuring secure data routing and preventing unauthorized access. What network device should they install to manage traffic and provide features like NAT and firewalls?",
    category: "Network Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Hub", is_correct: false },
      { choice_text: "Switch", is_correct: false },
      { choice_text: "Router", is_correct: true },
      { choice_text: "Bridge", is_correct: false }
    ]
  },
  {
    question_text: "In a busy office LAN with many computers, data is slowing down because it's being broadcast to all devices unnecessarily. What device can you add to learn MAC addresses and deliver frames only to the intended recipients for better efficiency?",
    category: "Network Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Hub", is_correct: false },
      { choice_text: "Router", is_correct: false },
      { choice_text: "Switch", is_correct: true },
      { choice_text: "Repeater", is_correct: false }
    ]
  },
  {
    question_text: "You're building a simple, low-cost network for a small group of computers in a classroom, and budget is tight. What basic device would you use to connect them, even if it broadcasts data to all ports without filtering?",
    category: "Network Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Switch", is_correct: false },
      { choice_text: "Router", is_correct: false },
      { choice_text: "Hub", is_correct: true },
      { choice_text: "Bridge", is_correct: false }
    ]
  },
  {
    question_text: "Your Ethernet cable run is 150 meters long, and the signal is weakening, causing data loss. What device can you install to amplify and regenerate the signal without changing the data?",
    category: "Network Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Switch", is_correct: false },
      { choice_text: "Router", is_correct: false },
      { choice_text: "Repeater", is_correct: true },
      { choice_text: "Bridge", is_correct: false }
    ]
  },
  {
    question_text: "A large office network is experiencing congestion because all devices are on one segment. What device can you use to divide it into smaller segments and filter traffic between them using the same protocol?",
    category: "Network Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Router", is_correct: false },
      { choice_text: "Switch", is_correct: false },
      { choice_text: "Bridge", is_correct: true },
      { choice_text: "Gateway", is_correct: false }
    ]
  },
  {
    question_text: "Your company's internal network uses TCP/IP, but you need to connect it to a partner's network that uses a different protocol. What device acts as the entry/exit point and handles protocol conversion?",
    category: "Network Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Bridge", is_correct: false },
      { choice_text: "Router", is_correct: false },
      { choice_text: "Gateway", is_correct: true },
      { choice_text: "Access Point", is_correct: false }
    ]
  },
  {
    question_text: "You're expanding Wi-Fi coverage in a large café with dead zones. What wireless device would you install to broadcast signals and allow more devices to connect to the wired network?",
    category: "Network Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Router", is_correct: false },
      { choice_text: "Modem", is_correct: false },
      { choice_text: "Access Point (AP)", is_correct: true },
      { choice_text: "NAS", is_correct: false }
    ]
  },
  {
    question_text: "A team needs a centralized way to store, share, and access files across multiple devices with redundancy. What dedicated network device, often using RAID, would you recommend?",
    category: "Network Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Access Point", is_correct: false },
      { choice_text: "Router", is_correct: false },
      { choice_text: "NAS", is_correct: true },
      { choice_text: "Wireless LAN Adapter", is_correct: false }
    ]
  },
  {
    question_text: "Your desktop computer lacks built-in Wi-Fi, and you need to connect it to a wireless network. What hardware component would you install inside the PC to enable this?",
    category: "Network Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Modem", is_correct: false },
      { choice_text: "Router", is_correct: false },
      { choice_text: "Wireless LAN Adapter / Wi-Fi PCI Card", is_correct: true },
      { choice_text: "NAS", is_correct: false }
    ]
  },

  // CLIENT DEVICES
  {
    question_text: "You're a student who needs to work on assignments while traveling between classes and accessing the internet on the go. What portable device with an integrated screen, keyboard, and battery would be ideal?",
    category: "Client Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Desktop", is_correct: false },
      { choice_text: "Printer", is_correct: false },
      { choice_text: "Laptop", is_correct: true },
      { choice_text: "Network Storage", is_correct: false }
    ]
  },
  {
    question_text: "A graphic designer requires a powerful, upgradeable computer for intensive tasks like video editing, but it doesn't need to be mobile. What non-portable device with a separate tower, monitor, and peripherals would suit this?",
    category: "Client Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Laptop", is_correct: false },
      { choice_text: "Printer", is_correct: false },
      { choice_text: "Desktop", is_correct: true },
      { choice_text: "Network Storage", is_correct: false }
    ]
  },
  {
    question_text: "Your office needs to produce physical copies of reports and photos. What hardware device can connect via USB, network, or wireless to output these documents?",
    category: "Client Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Laptop", is_correct: false },
      { choice_text: "Desktop", is_correct: false },
      { choice_text: "Printer", is_correct: true },
      { choice_text: "Network Storage", is_correct: false }
    ]
  },
  {
    question_text: "In a local area network, multiple users need to access shared files from a specialized server appliance with redundant drives. What is this file-level storage device called, often arranged in RAID?",
    category: "Client Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Laptop", is_correct: false },
      { choice_text: "Desktop", is_correct: false },
      { choice_text: "Printer", is_correct: false },
      { choice_text: "Network Storage", is_correct: true }
    ]
  },

  // IP ADDRESSING (TECHNICAL TERMS)
  {
    question_text: "Each device on your company's network needs a unique identifier for communication. What numerical label serves both to identify the device and specify its location in the network?",
    category: "IP Addressing",
    difficulty: "Easy",
    choices: [
      { choice_text: "Host Identification", is_correct: false },
      { choice_text: "Location Addressing", is_correct: false },
      { choice_text: "IP Address", is_correct: true },
      { choice_text: "MAC Address", is_correct: false }
    ]
  },
  {
    question_text: "Within a local network, you need to pinpoint a specific computer among others. What part of an IP address uniquely identifies that device on its subnet?",
    category: "IP Addressing",
    difficulty: "Easy",
    choices: [
      { choice_text: "Location Addressing", is_correct: false },
      { choice_text: "IP Address", is_correct: false },
      { choice_text: "Host Identification", is_correct: true },
      { choice_text: "Network Mask", is_correct: false }
    ]
  },
  {
    question_text: "To route data across different networks, you must know where a device belongs. What part of an IP address indicates the network segment for inter-network communication?",
    category: "IP Addressing",
    difficulty: "Easy",
    choices: [
      { choice_text: "Host Identification", is_correct: false },
      { choice_text: "IP Address", is_correct: false },
      { choice_text: "Location Addressing", is_correct: true },
      { choice_text: "Subnet Mask", is_correct: false }
    ]
  },

  // TOOLS & TESTING DEVICES
  {
    question_text: "While diagnosing a faulty Ethernet cable, you need to check for voltage, resistance, and continuity issues. What versatile tool would you use for these electrical measurements?",
    category: "Tools & Testing Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Punch Down Tool", is_correct: false },
      { choice_text: "Cable Tester", is_correct: false },
      { choice_text: "Multimeter", is_correct: true },
      { choice_text: "Crimping Tool", is_correct: false }
    ]
  },
  {
    question_text: "You're installing a new circuit board in a server and want to avoid damaging it with static electricity. What safety device grounds your body to prevent ESD?",
    category: "Tools & Testing Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Eye Protection", is_correct: false },
      { choice_text: "Multimeter", is_correct: false },
      { choice_text: "Antistatic Wrist Strap", is_correct: true },
      { choice_text: "Cable Tester", is_correct: false }
    ]
  },
  {
    question_text: "You're terminating network wires into a patch panel for a structured cabling system. What handheld tool inserts and secures the wires while trimming excess?",
    category: "Tools & Testing Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Crimping Tool", is_correct: false },
      { choice_text: "Cable Tester", is_correct: false },
      { choice_text: "Punch Down Tool", is_correct: true },
      { choice_text: "Multimeter", is_correct: false }
    ]
  },
  {
    question_text: "Before deploying a new batch of network cables, you suspect wiring faults like shorts or miswiring. What diagnostic device checks continuity, order, and signal quality?",
    category: "Tools & Testing Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Multimeter", is_correct: false },
      { choice_text: "Punch Down Tool", is_correct: false },
      { choice_text: "Cable Tester", is_correct: true },
      { choice_text: "Crimping Tool", is_correct: false }
    ]
  },
  {
    question_text: "You're attaching RJ45 connectors to UTP cables for Ethernet connections. What tool presses the metal pins into the wires to ensure a secure fit?",
    category: "Tools & Testing Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Punch Down Tool", is_correct: false },
      { choice_text: "Cable Tester", is_correct: false },
      { choice_text: "Crimping Tool", is_correct: true },
      { choice_text: "Multimeter", is_correct: false }
    ]
  },
  {
    question_text: "During cable stripping and installation, flying debris or wire snaps could injure your eyes. What safety equipment should you wear to protect them?",
    category: "Tools & Testing Devices",
    difficulty: "Easy",
    choices: [
      { choice_text: "Antistatic Wrist Strap", is_correct: false },
      { choice_text: "Multimeter", is_correct: false },
      { choice_text: "Eye Protection", is_correct: true },
      { choice_text: "Cable Tester", is_correct: false }
    ]
  },

  // NETWORK CABLE TYPES
  {
    question_text: "You need a common, cost-effective cable for an office Ethernet LAN that reduces interference. What type of cable, made of twisted copper pairs, would you choose?",
    category: "Network Cable Types",
    difficulty: "Easy",
    choices: [
      { choice_text: "Coaxial Cable", is_correct: false },
      { choice_text: "Fiber Optic Cable", is_correct: false },
      { choice_text: "Twisted Pair", is_correct: true },
      { choice_text: "Single Mode Fiber", is_correct: false }
    ]
  },
  {
    question_text: "For a standard home network setup, you want a cable that's easy to install and handles basic Ethernet speeds. What unshielded twisted pair variant is widely used?",
    category: "Network Cable Types",
    difficulty: "Easy",
    choices: [
      { choice_text: "STP", is_correct: false },
      { choice_text: "Coaxial Cable", is_correct: false },
      { choice_text: "UTP", is_correct: true },
      { choice_text: "Fiber Optic", is_correct: false }
    ]
  },
  {
    question_text: "In an industrial environment with high electromagnetic interference, you need a cable that's more protected. What shielded version of twisted pair would be suitable?",
    category: "Network Cable Types",
    difficulty: "Easy",
    choices: [
      { choice_text: "UTP", is_correct: false },
      { choice_text: "Coaxial Cable", is_correct: false },
      { choice_text: "STP", is_correct: true },
      { choice_text: "Fiber Optic", is_correct: false }
    ]
  },
  {
    question_text: "You're working on an older network system requiring cable for data transmission over moderate distances. What type of cable with a central conductor and shielding is appropriate?",
    category: "Network Cable Types",
    difficulty: "Easy",
    choices: [
      { choice_text: "Twisted Pair", is_correct: false },
      { choice_text: "Fiber Optic Cable", is_correct: false },
      { choice_text: "Coaxial Cable", is_correct: true },
      { choice_text: "Single Mode Fiber", is_correct: false }
    ]
  },
  {
    question_text: "For a short-run Ethernet setup in a retro computing project, you need a flexible coaxial cable. What thinner variant supports up to 185 meters?",
    category: "Network Cable Types",
    difficulty: "Easy",
    choices: [
      { choice_text: "Thicknet", is_correct: false },
      { choice_text: "Fiber Optic", is_correct: false },
      { choice_text: "Thinnet (10Base2)", is_correct: true },
      { choice_text: "Multimode Fiber", is_correct: false }
    ]
  },
  {
    question_text: "You're installing cable for a backbone in a large building, needing durability over 500 meters. What thicker coaxial type is better for longer distances?",
    category: "Network Cable Types",
    difficulty: "Easy",
    choices: [
      { choice_text: "Thinnet", is_correct: false },
      { choice_text: "Fiber Optic", is_correct: false },
      { choice_text: "Thicknet (10Base5)", is_correct: true },
      { choice_text: "Single Mode Fiber", is_correct: false }
    ]
  },
  {
    question_text: "Your data center requires high-speed, interference-free transmission over long distances. What cable uses light pulses through glass fibers?",
    category: "Network Cable Types",
    difficulty: "Easy",
    choices: [
      { choice_text: "Twisted Pair", is_correct: false },
      { choice_text: "Coaxial Cable", is_correct: false },
      { choice_text: "Fiber Optic Cable", is_correct: true },
      { choice_text: "STP", is_correct: false }
    ]
  },
  {
    question_text: "For a long-haul internet connection spanning kilometers, you need fiber with minimal signal loss. What type with a small core is ideal?",
    category: "Network Cable Types",
    difficulty: "Easy",
    choices: [
      { choice_text: "Multimode Fiber", is_correct: false },
      { choice_text: "Coaxial Cable", is_correct: false },
      { choice_text: "Single Mode Fiber", is_correct: true },
      { choice_text: "UTP", is_correct: false }
    ]
  },
  {
    question_text: "In a campus network for shorter distances, you want fiber that allows multiple light paths. What wider-core variant would you use?",
    category: "Network Cable Types",
    difficulty: "Easy",
    choices: [
      { choice_text: "Single Mode Fiber", is_correct: false },
      { choice_text: "Coaxial Cable", is_correct: false },
      { choice_text: "Multimode Fiber", is_correct: true },
      { choice_text: "STP", is_correct: false }
    ]
  },

  // CABLE CONNECTORS
  {
    question_text: "You're connecting an Ethernet cable to a router port. What 8-pin connector locks in and follows EIA/TIA wiring standards?",
    category: "Cable Connectors",
    difficulty: "Easy",
    choices: [
      { choice_text: "BNC Connector", is_correct: false },
      { choice_text: "Adapter", is_correct: false },
      { choice_text: "RJ45 Connector", is_correct: true },
      { choice_text: "Fiber Optic Connector", is_correct: false }
    ]
  },
  {
    question_text: "For an older coaxial cable setup in a CCTV system, you need a secure connector. What twist-lock type is commonly used?",
    category: "Cable Connectors",
    difficulty: "Easy",
    choices: [
      { choice_text: "RJ45 Connector", is_correct: false },
      { choice_text: "Adapter", is_correct: false },
      { choice_text: "BNC Connector", is_correct: true },
      { choice_text: "USB Connector", is_correct: false }
    ]
  },
  {
    question_text: "Your device has a USB port, but you need to connect it to an Ethernet cable. What device converts between incompatible interfaces?",
    category: "Cable Connectors",
    difficulty: "Easy",
    choices: [
      { choice_text: "RJ45 Connector", is_correct: false },
      { choice_text: "BNC Connector", is_correct: false },
      { choice_text: "Adapter", is_correct: true },
      { choice_text: "Router", is_correct: false }
    ]
  },

  // UTP COLOR CODING STANDARDS
  {
    question_text: "You're wiring a crossover cable and need a specific color order for the pairs. What standard arranges them as White Green/Green/White Orange/Blue/White Blue/Orange/White Brown/Brown?",
    category: "UTP Color Coding Standards",
    difficulty: "Easy",
    choices: [
      { choice_text: "EIA/TIA 568B", is_correct: false },
      { choice_text: "RJ45 Standard", is_correct: false },
      { choice_text: "EIA/TIA 568A", is_correct: true },
      { choice_text: "BNC Standard", is_correct: false }
    ]
  },
  {
    question_text: "For a straight-through Ethernet cable, you're following the most common wiring scheme. What standard uses White Orange/Orange/White Green/Blue/White Blue/Green/White Brown/Brown?",
    category: "UTP Color Coding Standards",
    difficulty: "Easy",
    choices: [
      { choice_text: "EIA/TIA 568A", is_correct: false },
      { choice_text: "RJ45 Standard", is_correct: false },
      { choice_text: "EIA/TIA 568B", is_correct: true },
      { choice_text: "Coaxial Standard", is_correct: false }
    ]
  },

  // CABLE RACEWAYS
  {
    question_text: "In an office renovation, you need to hide and protect network cables along walls without damaging them. What protective channel would you install?",
    category: "Cable Raceways",
    difficulty: "Easy",
    choices: [
      { choice_text: "Wiring Ducts", is_correct: false },
      { choice_text: "Raceway Fittings", is_correct: false },
      { choice_text: "Raceway", is_correct: true },
      { choice_text: "Mounting Boxes", is_correct: false }
    ]
  },
  {
    question_text: "Inside a server room, multiple cables are tangled and at risk. What plastic or metal ducts can route and organize them neatly?",
    category: "Cable Raceways",
    difficulty: "Easy",
    choices: [
      { choice_text: "Raceway", is_correct: false },
      { choice_text: "Raceway Fittings", is_correct: false },
      { choice_text: "Wiring Ducts", is_correct: true },
      { choice_text: "Mounting Boxes", is_correct: false }
    ]
  },
  {
    question_text: "You're extending a raceway around a corner in a building. What accessories like elbows and joints would connect the sections securely?",
    category: "Cable Raceways",
    difficulty: "Easy",
    choices: [
      { choice_text: "Raceway", is_correct: false },
      { choice_text: "Wiring Ducts", is_correct: false },
      { choice_text: "Raceway Fittings", is_correct: true },
      { choice_text: "Mounting Boxes", is_correct: false }
    ]
  },
  {
    question_text: "At the end of a cable run, you need to install network jacks. What boxes attached to the raceway hold outlets and connectors?",
    category: "Cable Raceways",
    difficulty: "Easy",
    choices: [
      { choice_text: "Raceway", is_correct: false },
      { choice_text: "Wiring Ducts", is_correct: false },
      { choice_text: "Raceway Fittings", is_correct: false },
      { choice_text: "Raceway Mounting Boxes", is_correct: true }
    ]
  }
];

async function addCOC2Week8Questions() {
  try {
    console.log('Adding COC2 Week 8-10 Terms for Reviewer questions to database...');
    
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

    console.log('Successfully added all COC2 Week 8-10 Terms for Reviewer questions!');
    
    // Verify the questions were added
    const countResult = await pool.query('SELECT COUNT(*) as count FROM coc2_quiz_questions');
    console.log(`Total questions in database: ${countResult.rows[0].count}`);
    
    // Show categories
    const categoryResult = await pool.query('SELECT DISTINCT category FROM coc2_quiz_questions ORDER BY category');
    console.log('Available categories:', categoryResult.rows.map(row => row.category));
    
  } catch (error) {
    console.error('Error adding questions:', error);
  } finally {
    await pool.end();
  }
}

addCOC2Week8Questions();
