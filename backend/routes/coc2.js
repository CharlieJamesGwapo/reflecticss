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

// Initialize COC 2 with comprehensive Network Devices questions
router.get('/initialize', async (req, res) => {
  try {
    // Step 1: Create COC2 tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS coc2_quiz_questions (
        id SERIAL PRIMARY KEY,
        question_text TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        question_number INTEGER NOT NULL,
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

    // Step 2: Clear existing data
    await pool.query('DELETE FROM coc2_quiz_choices');
    await pool.query('DELETE FROM coc2_quiz_questions');

    // Step 3: Insert comprehensive questions
    const questions = [
      // NETWORK DEVICES QUESTIONS
      {
        question_text: 'You are setting up internet access for a small office using a DSL connection through telephone lines. Which device should you install to convert digital signals into analog signals and back again?',
        category: 'Network Devices',
        question_number: 1,
        choices: [
          { choice_text: 'Hub', is_correct: false },
          { choice_text: 'Modem', is_correct: true },
          { choice_text: 'Router', is_correct: false },
          { choice_text: 'Switch', is_correct: false }
        ]
      },
      {
        question_text: 'A laptop only has a USB-C port, but the projector supports HDMI only. Which device should you use?',
        category: 'Network Devices',
        question_number: 2,
        choices: [
          { choice_text: 'Repeater', is_correct: false },
          { choice_text: 'Switch', is_correct: false },
          { choice_text: 'Adapter', is_correct: true },
          { choice_text: 'Router', is_correct: false }
        ]
      },
      {
        question_text: 'A company wants multiple devices to access the internet securely using NAT and firewall features. Which device should be installed?',
        category: 'Network Devices',
        question_number: 3,
        choices: [
          { choice_text: 'Router', is_correct: true },
          { choice_text: 'Hub', is_correct: false },
          { choice_text: 'Bridge', is_correct: false },
          { choice_text: 'Switch', is_correct: false }
        ]
      },
      {
        question_text: 'In an office network, data slows down because it is broadcast to all computers. Which device should be added to send data only to the intended device?',
        category: 'Network Devices',
        question_number: 4,
        choices: [
          { choice_text: 'Repeater', is_correct: false },
          { choice_text: 'Switch', is_correct: true },
          { choice_text: 'Hub', is_correct: false },
          { choice_text: 'Router', is_correct: false }
        ]
      },
      {
        question_text: 'A classroom needs a very low-cost network where data is broadcast to all ports. Which device fits this situation?',
        category: 'Network Devices',
        question_number: 5,
        choices: [
          { choice_text: 'Bridge', is_correct: false },
          { choice_text: 'Switch', is_correct: false },
          { choice_text: 'Hub', is_correct: true },
          { choice_text: 'Router', is_correct: false }
        ]
      },
      {
        question_text: 'An Ethernet cable run exceeds the recommended length and causes signal loss. Which device should be installed?',
        category: 'Network Devices',
        question_number: 6,
        choices: [
          { choice_text: 'Repeater', is_correct: true },
          { choice_text: 'Router', is_correct: false },
          { choice_text: 'Bridge', is_correct: false },
          { choice_text: 'Switch', is_correct: false }
        ]
      },
      {
        question_text: 'A large office network needs to be divided into smaller segments using the same protocol. Which device should be used?',
        category: 'Network Devices',
        question_number: 7,
        choices: [
          { choice_text: 'Router', is_correct: false },
          { choice_text: 'Bridge', is_correct: true },
          { choice_text: 'Switch', is_correct: false },
          { choice_text: 'Gateway', is_correct: false }
        ]
      },
      {
        question_text: 'A TCP/IP network must communicate with another network using a different protocol. Which device should handle this?',
        category: 'Network Devices',
        question_number: 8,
        choices: [
          { choice_text: 'Router', is_correct: false },
          { choice_text: 'Bridge', is_correct: false },
          { choice_text: 'Gateway', is_correct: true },
          { choice_text: 'Access Point', is_correct: false }
        ]
      },
      {
        question_text: 'A café has weak Wi-Fi signals in some areas. Which device should be installed to extend coverage?',
        category: 'Network Devices',
        question_number: 9,
        choices: [
          { choice_text: 'Modem', is_correct: false },
          { choice_text: 'Access Point (AP)', is_correct: true },
          { choice_text: 'Router', is_correct: false },
          { choice_text: 'NAS', is_correct: false }
        ]
      },
      {
        question_text: 'A workgroup needs shared file storage with redundancy and centralized access. Which device should be used?',
        category: 'Network Devices',
        question_number: 10,
        choices: [
          { choice_text: 'Router', is_correct: false },
          { choice_text: 'Wireless LAN Adapter', is_correct: false },
          { choice_text: 'NAS', is_correct: true },
          { choice_text: 'Access Point', is_correct: false }
        ]
      },

      // CLIENT DEVICES QUESTIONS
      {
        question_text: 'A desktop computer has no built-in Wi-Fi capability. Which component should be installed?',
        category: 'Client Devices',
        question_number: 11,
        choices: [
          { choice_text: 'Router', is_correct: false },
          { choice_text: 'Wireless LAN Adapter / Wi-Fi PCI Card', is_correct: true },
          { choice_text: 'Modem', is_correct: false },
          { choice_text: 'NAS', is_correct: false }
        ]
      },
      {
        question_text: 'A student needs a portable computer for schoolwork with a built-in battery and keyboard. Which device is most suitable?',
        category: 'Client Devices',
        question_number: 12,
        choices: [
          { choice_text: 'Laptop', is_correct: true },
          { choice_text: 'Desktop', is_correct: false },
          { choice_text: 'Printer', is_correct: false },
          { choice_text: 'Network Storage', is_correct: false }
        ]
      },
      {
        question_text: 'A graphic designer needs a powerful, upgradeable computer that stays in one place. Which device fits this need?',
        category: 'Client Devices',
        question_number: 13,
        choices: [
          { choice_text: 'Laptop', is_correct: false },
          { choice_text: 'Printer', is_correct: false },
          { choice_text: 'Desktop', is_correct: true },
          { choice_text: 'Network Storage', is_correct: false }
        ]
      },
      {
        question_text: 'An office needs to produce hard copies of documents and photos. Which device should be connected?',
        category: 'Client Devices',
        question_number: 14,
        choices: [
          { choice_text: 'Desktop', is_correct: false },
          { choice_text: 'Printer', is_correct: true },
          { choice_text: 'Laptop', is_correct: false },
          { choice_text: 'Network Storage', is_correct: false }
        ]
      },
      {
        question_text: 'Multiple users in a LAN need access to shared files stored in a dedicated storage system. Which device should be used?',
        category: 'Client Devices',
        question_number: 15,
        choices: [
          { choice_text: 'Printer', is_correct: false },
          { choice_text: 'Desktop', is_correct: false },
          { choice_text: 'Laptop', is_correct: false },
          { choice_text: 'Network Storage', is_correct: true }
        ]
      },
      {
        question_text: 'Every device on a network must be uniquely identified to communicate properly. Which identifier allows this?',
        category: 'Client Devices',
        question_number: 16,
        choices: [
          { choice_text: 'MAC Address', is_correct: false },
          { choice_text: 'IP Address', is_correct: true },
          { choice_text: 'Host Identification', is_correct: false },
          { choice_text: 'Location Addressing', is_correct: false }
        ]
      },
      {
        question_text: 'Within a subnet, which part of the IP address identifies a specific device?',
        category: 'Client Devices',
        question_number: 17,
        choices: [
          { choice_text: 'Network Mask', is_correct: false },
          { choice_text: 'Location Addressing', is_correct: false },
          { choice_text: 'Host Identification', is_correct: true },
          { choice_text: 'IP Address', is_correct: false }
        ]
      },
      {
        question_text: 'Routers need to know which network a device belongs to when forwarding data. Which IP address part provides this?',
        category: 'Client Devices',
        question_number: 18,
        choices: [
          { choice_text: 'Location Addressing', is_correct: true },
          { choice_text: 'Host Identification', is_correct: false },
          { choice_text: 'IP Address', is_correct: false },
          { choice_text: 'Subnet Mask', is_correct: false }
        ]
      },

      // TOOLS & TESTING DEVICES QUESTIONS
      {
        question_text: 'While troubleshooting a faulty Ethernet cable, you need to measure voltage and continuity. Which tool should you use?',
        category: 'Tools & Testing Devices',
        question_number: 19,
        choices: [
          { choice_text: 'Cable Tester', is_correct: false },
          { choice_text: 'Multimeter', is_correct: true },
          { choice_text: 'Crimping Tool', is_correct: false },
          { choice_text: 'Punch Down Tool', is_correct: false }
        ]
      },
      {
        question_text: 'When installing sensitive electronic components, which device prevents static discharge damage?',
        category: 'Tools & Testing Devices',
        question_number: 20,
        choices: [
          { choice_text: 'Multimeter', is_correct: false },
          { choice_text: 'Antistatic Wrist Strap', is_correct: true },
          { choice_text: 'Eye Protection', is_correct: false },
          { choice_text: 'Cable Tester', is_correct: false }
        ]
      },
      {
        question_text: 'Network cables are being terminated into a patch panel. Which tool secures and trims the wires?',
        category: 'Tools & Testing Devices',
        question_number: 21,
        choices: [
          { choice_text: 'Crimping Tool', is_correct: false },
          { choice_text: 'Cable Tester', is_correct: false },
          { choice_text: 'Punch Down Tool', is_correct: true },
          { choice_text: 'Multimeter', is_correct: false }
        ]
      },
      {
        question_text: 'Before installing network cables, which device checks for shorts and miswiring?',
        category: 'Tools & Testing Devices',
        question_number: 22,
        choices: [
          { choice_text: 'Cable Tester', is_correct: true },
          { choice_text: 'Multimeter', is_correct: false },
          { choice_text: 'Punch Down Tool', is_correct: false },
          { choice_text: 'Crimping Tool', is_correct: false }
        ]
      },
      {
        question_text: 'You are attaching RJ45 connectors to UTP cables. Which tool should be used?',
        category: 'Tools & Testing Devices',
        question_number: 23,
        choices: [
          { choice_text: 'Punch Down Tool', is_correct: false },
          { choice_text: 'Crimping Tool', is_correct: true },
          { choice_text: 'Multimeter', is_correct: false },
          { choice_text: 'Cable Tester', is_correct: false }
        ]
      },
      {
        question_text: 'During cable installation, which safety equipment protects your eyes?',
        category: 'Tools & Testing Devices',
        question_number: 24,
        choices: [
          { choice_text: 'Eye Protection', is_correct: true },
          { choice_text: 'Antistatic Wrist Strap', is_correct: false },
          { choice_text: 'Multimeter', is_correct: false },
          { choice_text: 'Cable Tester', is_correct: false }
        ]
      }
    ];

    // Add remaining questions
    const additionalQuestions = [
      // NETWORK CABLES, CONNECTORS AND RACEWAYS QUESTIONS
      {
        question_text: 'An office LAN needs an affordable Ethernet cable that reduces interference using twisted copper wires. Which cable should be chosen?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 25,
        choices: [
          { choice_text: 'Fiber Optic Cable', is_correct: false },
          { choice_text: 'Twisted Pair', is_correct: true },
          { choice_text: 'Coaxial Cable', is_correct: false },
          { choice_text: 'Single Mode Fiber', is_correct: false }
        ]
      },
      {
        question_text: 'A home network requires a simple and widely used Ethernet cable. Which one fits this setup?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 26,
        choices: [
          { choice_text: 'UTP', is_correct: true },
          { choice_text: 'STP', is_correct: false },
          { choice_text: 'Coaxial Cable', is_correct: false },
          { choice_text: 'Fiber Optic', is_correct: false }
        ]
      },
      {
        question_text: 'A factory has strong electromagnetic interference. Which Ethernet cable provides extra protection?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 27,
        choices: [
          { choice_text: 'UTP', is_correct: false },
          { choice_text: 'STP', is_correct: true },
          { choice_text: 'Coaxial Cable', is_correct: false },
          { choice_text: 'Fiber Optic', is_correct: false }
        ]
      },
      {
        question_text: 'An older networking system requires a cable with a central conductor and shielding. Which cable should be used?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 28,
        choices: [
          { choice_text: 'Twisted Pair', is_correct: false },
          { choice_text: 'Coaxial Cable', is_correct: true },
          { choice_text: 'Fiber Optic Cable', is_correct: false },
          { choice_text: 'Single Mode Fiber', is_correct: false }
        ]
      },
      {
        question_text: 'A retro Ethernet setup needs a coaxial cable that supports up to 185 meters. Which cable is appropriate?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 29,
        choices: [
          { choice_text: 'Thicknet', is_correct: false },
          { choice_text: 'Thinnet (10Base2)', is_correct: true },
          { choice_text: 'Fiber Optic', is_correct: false },
          { choice_text: 'Multimode Fiber', is_correct: false }
        ]
      },
      {
        question_text: 'A backbone network needs a coaxial cable that supports up to 500 meters. Which cable should be used?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 30,
        choices: [
          { choice_text: 'Thicknet (10Base5)', is_correct: true },
          { choice_text: 'Thinnet', is_correct: false },
          { choice_text: 'Fiber Optic', is_correct: false },
          { choice_text: 'Single Mode Fiber', is_correct: false }
        ]
      },
      {
        question_text: 'A data center needs high-speed transmission using light instead of electricity. Which cable meets this requirement?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 31,
        choices: [
          { choice_text: 'Coaxial Cable', is_correct: false },
          { choice_text: 'Fiber Optic Cable', is_correct: true },
          { choice_text: 'Twisted Pair', is_correct: false },
          { choice_text: 'STP', is_correct: false }
        ]
      },
      {
        question_text: 'A long-distance internet link needs fiber with minimal signal loss. Which type should be used?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 32,
        choices: [
          { choice_text: 'Multimode Fiber', is_correct: false },
          { choice_text: 'Single Mode Fiber', is_correct: true },
          { choice_text: 'Coaxial Cable', is_correct: false },
          { choice_text: 'UTP', is_correct: false }
        ]
      },
      {
        question_text: 'A campus network needs fiber for shorter distances with multiple light paths. Which type is suitable?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 33,
        choices: [
          { choice_text: 'Multimode Fiber', is_correct: true },
          { choice_text: 'Single Mode Fiber', is_correct: false },
          { choice_text: 'Coaxial Cable', is_correct: false },
          { choice_text: 'STP', is_correct: false }
        ]
      },
      {
        question_text: 'An Ethernet cable must be connected securely using an 8-pin connector that follows standards. Which connector is required?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 34,
        choices: [
          { choice_text: 'RJ45 Connector', is_correct: true },
          { choice_text: 'BNC Connector', is_correct: false },
          { choice_text: 'Adapter', is_correct: false },
          { choice_text: 'Fiber Optic Connector', is_correct: false }
        ]
      },
      {
        question_text: 'A CCTV system uses coaxial cables with twist-lock connections. Which connector should be used?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 35,
        choices: [
          { choice_text: 'RJ45 Connector', is_correct: false },
          { choice_text: 'BNC Connector', is_correct: true },
          { choice_text: 'Adapter', is_correct: false },
          { choice_text: 'USB Connector', is_correct: false }
        ]
      },
      {
        question_text: 'A device with only a USB port must connect to an Ethernet cable. Which device allows this?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 36,
        choices: [
          { choice_text: 'Router', is_correct: false },
          { choice_text: 'RJ45 Connector', is_correct: false },
          { choice_text: 'Adapter', is_correct: true },
          { choice_text: 'BNC Connector', is_correct: false }
        ]
      },
      {
        question_text: 'While making a crossover cable, you start with the White-Green wire. Which wiring standard are you following?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 37,
        choices: [
          { choice_text: 'EIA/TIA 568B', is_correct: false },
          { choice_text: 'EIA/TIA 568A', is_correct: true },
          { choice_text: 'RJ45 Standard', is_correct: false },
          { choice_text: 'BNC Standard', is_correct: false }
        ]
      },
      {
        question_text: 'While making a straight-through cable, you start with the White-Orange wire. Which standard is used?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 38,
        choices: [
          { choice_text: 'EIA/TIA 568B', is_correct: true },
          { choice_text: 'EIA/TIA 568A', is_correct: false },
          { choice_text: 'RJ45 Standard', is_correct: false },
          { choice_text: 'Coaxial Standard', is_correct: false }
        ]
      },
      {
        question_text: 'During an office renovation, cables must be hidden and protected along walls. Which solution should be installed?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 39,
        choices: [
          { choice_text: 'Wiring Ducts', is_correct: false },
          { choice_text: 'Raceway', is_correct: true },
          { choice_text: 'Raceway Fittings', is_correct: false },
          { choice_text: 'Mounting Boxes', is_correct: false }
        ]
      },
      {
        question_text: 'Inside a server room, many cables must be organized neatly. Which component should be used?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 40,
        choices: [
          { choice_text: 'Wiring Ducts', is_correct: true },
          { choice_text: 'Raceway', is_correct: false },
          { choice_text: 'Raceway Fittings', is_correct: false },
          { choice_text: 'Mounting Boxes', is_correct: false }
        ]
      },
      {
        question_text: 'A raceway must turn corners and connect sections securely. Which accessory is needed?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 41,
        choices: [
          { choice_text: 'Raceway', is_correct: false },
          { choice_text: 'Raceway Fittings', is_correct: true },
          { choice_text: 'Wiring Ducts', is_correct: false },
          { choice_text: 'Mounting Boxes', is_correct: false }
        ]
      },
      {
        question_text: 'At the end of a cable run, network outlets must be mounted properly. Which component should be installed?',
        category: 'Network Cables, Connectors and Raceways',
        question_number: 42,
        choices: [
          { choice_text: 'Raceway', is_correct: false },
          { choice_text: 'Wiring Ducts', is_correct: false },
          { choice_text: 'Raceway Fittings', is_correct: false },
          { choice_text: 'Raceway Mounting Boxes', is_correct: true }
        ]
      },

      // NETWORK TOPOLOGY QUESTIONS
      {
        question_text: 'Your teacher asks the class to redesign the computer lab, focusing on how devices are arranged and connected. What concept are you being asked to work on?',
        category: 'Network Topology',
        question_number: 43,
        choices: [
          { choice_text: 'Network Security', is_correct: false },
          { choice_text: 'Network Topology', is_correct: true },
          { choice_text: 'Printer Sharing', is_correct: false },
          { choice_text: 'IP Address', is_correct: false }
        ]
      },
      {
        question_text: 'In a small shop, all computers are connected to a single main cable. When the cable is damaged, the whole network stops working. What topology is this?',
        category: 'Network Topology',
        question_number: 44,
        choices: [
          { choice_text: 'Mesh', is_correct: false },
          { choice_text: 'Bus', is_correct: true },
          { choice_text: 'Star', is_correct: false },
          { choice_text: 'Hybrid', is_correct: false }
        ]
      },
      {
        question_text: 'A school network uses a central switch to connect all computers. If the switch fails, all computers lose connection. What topology is this?',
        category: 'Network Topology',
        question_number: 45,
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
        question_number: 46,
        choices: [
          { choice_text: 'Mesh', is_correct: true },
          { choice_text: 'Ring', is_correct: false },
          { choice_text: 'Bus', is_correct: false },
          { choice_text: 'LAN', is_correct: false }
        ]
      },
      {
        question_text: 'A university uses both star and ring topologies in different buildings, combining them together. What topology is this called?',
        category: 'Network Topology',
        question_number: 47,
        choices: [
          { choice_text: 'Mesh', is_correct: false },
          { choice_text: 'Hybrid', is_correct: true },
          { choice_text: 'Bus', is_correct: false },
          { choice_text: 'Tree', is_correct: false }
        ]
      },

      // NETWORK CONFIGURATION AND LOCATION QUESTIONS
      {
        question_text: 'A computer shop with 12 PCs shares internet and files within the shop. What type of network is this?',
        category: 'Network Configuration and Location',
        question_number: 48,
        choices: [
          { choice_text: 'WAN', is_correct: false },
          { choice_text: 'LAN', is_correct: true },
          { choice_text: 'Public Network', is_correct: false },
          { choice_text: 'Domain', is_correct: false }
        ]
      },
      {
        question_text: 'A company connects offices located in Manila, Cebu, and Davao through a single network. What type of network is used?',
        category: 'Network Configuration and Location',
        question_number: 49,
        choices: [
          { choice_text: 'LAN', is_correct: false },
          { choice_text: 'WAN', is_correct: true },
          { choice_text: 'Tree', is_correct: false },
          { choice_text: 'Mesh', is_correct: false }
        ]
      },
      {
        question_text: 'Your phone can\'t connect to Wi-Fi because it has no assigned number that identifies it in the network. What is missing?',
        category: 'Network Configuration and Location',
        question_number: 50,
        choices: [
          { choice_text: 'MAC Address', is_correct: false },
          { choice_text: 'DHCP', is_correct: false },
          { choice_text: 'IP Address', is_correct: true },
          { choice_text: 'Firewall', is_correct: false }
        ]
      },
      {
        question_text: 'A home router automatically assigns IP addresses to all phones and laptops that connect. What feature is doing this?',
        category: 'Network Configuration and Location',
        question_number: 51,
        choices: [
          { choice_text: 'Firewall', is_correct: false },
          { choice_text: 'DHCP Server', is_correct: true },
          { choice_text: 'Proxy', is_correct: false },
          { choice_text: 'IPv4', is_correct: false }
        ]
      },
      {
        question_text: 'A school blocks a specific student\'s device from connecting to Wi-Fi by using its unique hardware identifier. What identifier was used?',
        category: 'Network Configuration and Location',
        question_number: 52,
        choices: [
          { choice_text: 'IP Address', is_correct: false },
          { choice_text: 'MAC Address', is_correct: true },
          { choice_text: 'Subnet Mask', is_correct: false },
          { choice_text: 'Domain Name', is_correct: false }
        ]
      },

      // NETWORK SHARING AND SECURITY QUESTIONS
      {
        question_text: 'Three classmates work on a project using the same folder accessible over the school network. What is this called?',
        category: 'Network Sharing and Security',
        question_number: 53,
        choices: [
          { choice_text: 'Printer Sharing', is_correct: false },
          { choice_text: 'File Sharing', is_correct: true },
          { choice_text: 'Domain Network', is_correct: false },
          { choice_text: 'WAN', is_correct: false }
        ]
      },
      {
        question_text: 'In an office, all employees can print from the same printer over the network. What is this?',
        category: 'Network Sharing and Security',
        question_number: 54,
        choices: [
          { choice_text: 'LAN', is_correct: false },
          { choice_text: 'Printer Sharing', is_correct: true },
          { choice_text: 'Proxy', is_correct: false },
          { choice_text: 'Firewall', is_correct: false }
        ]
      },
      {
        question_text: 'A business installs tools to protect its network from hackers. What is this called?',
        category: 'Network Sharing and Security',
        question_number: 55,
        choices: [
          { choice_text: 'IP Addressing', is_correct: false },
          { choice_text: 'Network Security', is_correct: true },
          { choice_text: 'File Sharing', is_correct: false },
          { choice_text: 'Public Network', is_correct: false }
        ]
      },
      {
        question_text: 'Your router blocks suspicious incoming traffic to protect your data. What is this feature?',
        category: 'Network Sharing and Security',
        question_number: 56,
        choices: [
          { choice_text: 'Subnet Mask', is_correct: false },
          { choice_text: 'Virus Protection', is_correct: false },
          { choice_text: 'Firewall', is_correct: true },
          { choice_text: 'Mesh Topology', is_correct: false }
        ]
      },
      {
        question_text: 'Your laptop blocks all unknown connections that try to enter the system. What is being used?',
        category: 'Network Sharing and Security',
        question_number: 57,
        choices: [
          { choice_text: 'Outbound Rules', is_correct: false },
          { choice_text: 'Inbound Rules', is_correct: true },
          { choice_text: 'MAC Filtering', is_correct: false },
          { choice_text: 'DHCP', is_correct: false }
        ]
      }
    ];

    // Combine all questions
    const allQuestions = [...questions, ...additionalQuestions];

    // Step 4: Insert questions and choices
    for (const question of allQuestions) {
      const questionResult = await pool.query(
        'INSERT INTO coc2_quiz_questions (question_text, category, question_number) VALUES ($1, $2, $3) RETURNING id',
        [question.question_text, question.category, question.question_number]
      );
      
      const questionId = questionResult.rows[0].id;
      
      for (const choice of question.choices) {
        await pool.query(
          'INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES ($1, $2, $3)',
          [questionId, choice.choice_text, choice.is_correct]
        );
      }
    }

    res.json({ 
      message: 'COC 2 comprehensive Network Devices quiz initialized successfully',
      totalQuestions: allQuestions.length,
      categories: [
        'Network Devices', 
        'Client Devices', 
        'Tools & Testing Devices', 
        'Network Cables, Connectors and Raceways',
        'Network Topology',
        'Network Configuration and Location',
        'Network Sharing and Security'
      ]
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
